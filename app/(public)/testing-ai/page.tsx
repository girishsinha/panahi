"use client";

// import { useChat } from "@ai-sdk/react";
import {
  ArrowUpIcon,
  GlobeIcon,
  ImageIcon,
  MessageCircleDashedIcon,
  PaperclipIcon,
  PlusIcon,
  RotateCwIcon,
  TelescopeIcon,
} from "lucide-react";

// import { createChat, getMessageText } from "@/lib/ai";
// import { MessageAnimated } from "@/components/message-animated";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
// import {
//   InputGroup,
//   InputGroupAddon,
//   InputGroupButton,
// } from "@/components/ui/input-group";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { Message, MessageContent } from "@/components/ui/message";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";

const Page = () => {
  const message = [
    {
      id: "anchor-1-user",
      role: "user",
      text: "Can you show me how anchoring behaves when a new prompt starts the turn?",
    },
    {
      id: "anchor-1-assistant",
      role: "assistant",
      text: "Append the user prompt first, then append the assistant response. With User selected, the prompt settles near the top and the assistant response fills in below it.",
    },
    {
      id: "anchor-2-user",
      role: "user",
      text: "What changes when assistant messages are the anchor?",
    },
    {
      id: "anchor-2-assistant",
      role: "assistant",
      text: "Now each assistant response is the item `MessageScroller` keeps in view. This is useful when the reply is the moment you want readers to land on after each turn.",
    },
    {
      id: "anchor-3-user",
      role: "user",
      text: "Can I switch roles and keep adding turns?",
    },
    {
      id: "anchor-3-assistant",
      role: "assistant",
      text: "Yes. The next appended message with the selected role becomes the anchor, so you can compare user and assistant anchoring without resetting the demo.",
    },
    {
      id: "anchor-4-user",
      role: "user",
      text: "Can I switch roles and keep adding turns?",
    },
    {
      id: "anchor-4-assistant",
      role: "assistant",
      text: "Yes. The next appended message with the selected role becomes the anchor, so you can compare user and assistant anchoring without resetting the demo.",
    },
    {
      id: "anchor-5-user",
      role: "user",
      text: "Can I switch roles and keep adding turns?",
    },
    {
      id: "anchor-5-assistant",
      role: "assistant",
      text: "Yes. The next appended message with the selected role becomes the anchor, so you can compare user and assistant anchoring without resetting the demo.",
    },
    {
      id: "anchor-6-user",
      role: "user",
      text: "Can I switch roles and keep adding turns?",
    },
    {
      id: "anchor-6-assistant",
      role: "assistant",
      text: "Yes. The next appended message with the selected role becomes the anchor, so you can compare user and assistant anchoring without resetting the demo.",
    },
  ];
  return (
    <main className="w-full  z-10 h-full sm:px-6 lg:px-10">
      <MessageScrollerProvider>
        <div className="relative flex flex-col gap-4">
          <Card className="mx-auto h-140 w-full max-w-sm gap-0">
            <CardContent className="flex-1 overflow-hidden p-0">
              {message.length === 0 ? (
                <Empty className="h-full">
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <MessageCircleDashedIcon />
                    </EmptyMedia>
                    <EmptyTitle>Morning, shadcn!</EmptyTitle>
                    <EmptyDescription>
                      What are we working on today? Press send to start a new
                      conversation
                    </EmptyDescription>
                  </EmptyHeader>
                </Empty>
              ) : (
                <MessageScroller>
                  <MessageScrollerViewport className="p-4">
                    <MessageScrollerContent
                      // aria-busy={isBusy}
                      className="p-(--card-spacing)"
                    >
                      {message.map((message) => (
                        <MessageScrollerItem
                          key={message.id}
                          messageId={message.id}
                          scrollAnchor={message.role === "user"}
                        >
                          <Message
                            align={message.role === "user" ? "end" : "start"}
                          >
                            <MessageContent>
                              {" "}
                              {message.role == "user" ? (
                                <Bubble variant="secondary">
                                  <BubbleContent>{message.text}</BubbleContent>
                                </Bubble>
                              ) : (
                                <Bubble variant="ghost">
                                  <BubbleContent>{message.text}</BubbleContent>
                                </Bubble>
                              )}
                            </MessageContent>
                          </Message>
                        </MessageScrollerItem>
                      ))}
                    </MessageScrollerContent>
                  </MessageScrollerViewport>
                  <MessageScrollerButton />
                </MessageScroller>
              )}
            </CardContent>
          </Card>
          <div className="px-0.5 text-center text-xs text-muted-foreground">
            Demo is read only. Press send to send messages.
          </div>
        </div>
      </MessageScrollerProvider>
    </main>
  );
};
export default Page;
