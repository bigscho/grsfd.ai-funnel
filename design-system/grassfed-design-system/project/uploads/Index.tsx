import { useState, useRef, useEffect, useCallback } from "react";
import Header from "@/components/chat/Header";
import ChatMessage from "@/components/chat/ChatMessage";
import TypingIndicator from "@/components/chat/TypingIndicator";
import WelcomeHero from "@/components/chat/WelcomeHero";
import SuggestedChips from "@/components/chat/SuggestedChips";
import QueryFormCard from "@/components/chat/QueryFormCard";
import EmailCaptureCard from "@/components/chat/EmailCaptureCard";
import CTAWallCard from "@/components/chat/CTAWallCard";
import ChatInput from "@/components/chat/ChatInput";

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const FALLBACK_MESSAGE =
  "I'd love to help you explore your market! Tell me a city or zip code and I'll pull up the homeowner data for you.";

const WELCOME_MESSAGE =
  "AI real estate data & cold email is here.\n\nSee how many emails are in your exact farm area.\n\nUse AI cold email to hit way more homeowners, way faster, for way less than what postcards cost.";

/** Post-process AI text so it always has breathing room between sections */
function formatResponse(raw: string): string {
  let text = raw.trim();

  // Normalize any 3+ newlines down to 2
  text = text.replace(/\n{3,}/g, "\n\n");

  // Ensure blank line BEFORE a bullet line that follows a non-blank, non-bullet line
  text = text.replace(/([^\n])\n([-•●▸] )/g, "$1\n\n$2");

  // Ensure blank line AFTER a bullet block before a non-bullet paragraph
  text = text.replace(/([-•●▸] [^\n]+)\n([^-•●▸\n\s])/g, "$1\n\n$2");

  // Ensure blank line before emoji P.S. lines
  text = text.replace(/([^\n])\n(📬|📈|🔒|💡|🏡)/g, "$1\n\n$2");

  // Ensure blank line before "If you emailed" / "That's a" pipeline summary lines
  text = text.replace(/([^\n])\n(If you emailed|That's a )/g, "$1\n\n$2");

  // Ensure blank line before "Want me to" follow-up lines
  text = text.replace(/([^\n])\n(Want me to|Want to )/g, "$1\n\n$2");

  // Ensure blank line after bold headline counts (e.g. **~4,050 homeowner emails**)
  text = text.replace(/(\*\*[^*]+\*\*[^\n]*)\n([-•●▸] )/g, "$1\n\n$2");

  // Fix clumpy text where a period/sentence runs directly into a bold count with no space
  // e.g. "can do.**~0 homeowner" → "can do.\n\n**~0 homeowner"
  text = text.replace(/([.!?])(\*\*)/g, "$1\n\n$2");

  // Also fix cases where text runs into bold without punctuation (e.g. "do.**0")  
  text = text.replace(/([a-z])\.(\*\*)/gi, "$1.\n\n$2");

  return text;
}

const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL || "";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: WELCOME_MESSAGE },
  ]);
  const [chatsUsed, setChatsUsed] = useState(0);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [isLimitReached, setIsLimitReached] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMcpQuery, setIsMcpQuery] = useState(false);
  const [showQueryForm, setShowQueryForm] = useState(true);

  const scrollRef = useRef<HTMLDivElement>(null);
  const isSendingRef = useRef(false);
  const pendingResponseRef = useRef<string | null>(null);
  const emailSubmittedRef = useRef(false);
  const abortRef = useRef<AbortController | null>(null);
  // Mirror of messages as a ref so we can build the API payload without waiting for state
  const messagesRef = useRef<Message[]>(messages);

  // Keep messagesRef in sync
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const hasInteracted = useRef(false);

  useEffect(() => {
    if (!hasInteracted.current) return;
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading, showEmailCapture]);

  const sendMessage = useCallback(
    async (content: string) => {
      // Strict duplicate guard
      if (isSendingRef.current) return;
      if (isLimitReached || showEmailCapture) return;
      isSendingRef.current = true;

      // Abort any previous in-flight request
      if (abortRef.current) {
        abortRef.current.abort();
      }
      const controller = new AbortController();
      abortRef.current = controller;

      setShowQueryForm(false);
      hasInteracted.current = true;
      const userMsg: Message = { role: "user", content };
      const isFirstMessage = chatsUsed === 0 && !userEmail;

      // Build the API payload from the ref (always current, no state timing issues)
      const apiMessages = [...messagesRef.current, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      // Add user message to state
      setMessages((prev) => [...prev, userMsg]);

      if (isFirstMessage) {
        setShowEmailCapture(true);
      }
      setIsMcpQuery(false);
      setIsLoading(true);

      try {
        // Frontend timeout — 60 seconds
        const timeoutId = setTimeout(() => controller.abort(), 60000);

        const resp = await fetch(CHAT_URL, {
          method: "POST",
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ messages: apiMessages }),
        });

        clearTimeout(timeoutId);

        if (!resp.ok) {
          let message = "Something went wrong — please try again in a moment.";
          try {
            const body = await resp.json();
            message = body?.error || message;
          } catch {}
          throw new Error(message);
        }

        if (!resp.body) throw new Error("No response stream");

        const reader = resp.body.getReader();
        const decoder = new TextDecoder();
        let textBuffer = "";
        let fullText = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          textBuffer += decoder.decode(value, { stream: true });

          let nlIdx: number;
          while ((nlIdx = textBuffer.indexOf("\n")) !== -1) {
            const line = textBuffer.slice(0, nlIdx).trim();
            textBuffer = textBuffer.slice(nlIdx + 1);

            if (!line.startsWith("data: ")) continue;
            const jsonStr = line.slice(6).trim();
            if (jsonStr === "[DONE]") continue;

            try {
              const parsed = JSON.parse(jsonStr);
              if (parsed.type === "mcp_start") {
                setIsMcpQuery(true);
              } else if (parsed.type === "text" && parsed.text) {
                fullText += parsed.text;
              }
            } catch {
              // partial JSON, skip
            }
          }
        }

        // Stream complete — always produce a response
        const responseText = formatResponse(fullText.trim() || FALLBACK_MESSAGE);

        if (isFirstMessage) {
          if (emailSubmittedRef.current) {
            // Email was already submitted while we were streaming — show immediately
            setMessages((prev) => [...prev, { role: "assistant", content: responseText }]);
            emailSubmittedRef.current = false;
          } else {
            // Store for later; will be revealed when email is submitted
            pendingResponseRef.current = responseText;
          }
        } else {
          setMessages((prev) => [...prev, { role: "assistant", content: responseText }]);
        }

        setChatsUsed((prev) => {
          const newCount = prev + 1;
          if (!isFirstMessage && newCount >= 3) {
            setIsLimitReached(true);
          }
          return newCount;
        });
      } catch (err: any) {
        // Ignore aborted requests (superseded by a newer one)
        if (err?.name === "AbortError") {
          return;
        }
        console.error("Chat error:", err);
        const errorMessage =
          err?.message || FALLBACK_MESSAGE;
        if (isFirstMessage) {
          setShowEmailCapture(false);
        }
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: errorMessage },
        ]);
      } finally {
        setIsLoading(false);
        isSendingRef.current = false;
        abortRef.current = null;
      }
    },
    [isLimitReached, showEmailCapture, chatsUsed, userEmail]
  );

  const handleEmailSubmit = useCallback(
    (email: string, firstName: string, phone: string) => {
      setUserEmail(email);
      setShowEmailCapture(false);

      // Reveal the pending first-message response
      if (pendingResponseRef.current) {
        const text = pendingResponseRef.current;
        pendingResponseRef.current = null;
        setMessages((prev) => [...prev, { role: "assistant", content: text }]);
      } else {
        // Stream still in progress — flag so it shows immediately when it finishes
        emailSubmittedRef.current = true;
      }

      if (WEBHOOK_URL) {
        fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            firstName,
            phone,
            timestamp: new Date().toISOString(),
            source: "grassfed-market-intel",
            first_query: messagesRef.current.find((m) => m.role === "user")?.content || "",
          }),
        }).catch(console.error);
      }
    },
    []
  );

  const remainingLookups =
    userEmail && !isLimitReached ? 3 - chatsUsed : null;

  const inputDisabled = isLoading || showEmailCapture || isLimitReached || showQueryForm;
  const inputPlaceholder = isLimitReached
    ? "You've used your free market lookups"
    : showEmailCapture
    ? "Enter your email above to continue"
    : showQueryForm
    ? "Fill out the form above to get started"
    : undefined;

  return (
    <div className="flex flex-col h-dvh bg-chat-surface noise-overlay">
      <Header />

      {/* Chat area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="max-w-3xl mx-auto px-3 sm:px-4 py-4 space-y-4">
          {messages.map((msg, i) =>
            i === 0 && msg.role === "assistant" ? (
              <WelcomeHero key={i} content={msg.content} />
            ) : msg.role === "assistant" && (!msg.content || !msg.content.trim()) ? null : (
              <ChatMessage
                key={i}
                role={msg.role}
                content={msg.content}
                isStreaming={isLoading && i === messages.length - 1 && msg.role === "assistant"}
              />
            )
          )}

          {isLoading && <TypingIndicator showStatus={isMcpQuery} />}

          {showQueryForm && messages.length === 1 && !isLoading && (
            <div className="space-y-3">
              <SuggestedChips onSelect={(q) => { setShowQueryForm(false); sendMessage(q); }} />
              <div className="px-1">
                <div className="h-px bg-white/10" />
              </div>
              <QueryFormCard onSubmit={(query) => {
                setShowQueryForm(false);
                sendMessage(query);
              }} />
            </div>
          )}

          {showEmailCapture && <EmailCaptureCard onSubmit={handleEmailSubmit} />}

          {isLimitReached && <CTAWallCard />}
        </div>
      </div>

      {/* Input */}
      <ChatInput
        onSend={sendMessage}
        disabled={inputDisabled}
        disabledPlaceholder={inputPlaceholder}
        remainingLookups={remainingLookups}
      />
    </div>
  );
};

export default Index;
