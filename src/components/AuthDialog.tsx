import { Dialog, DialogContent } from "./ui/dialog";
import { TDialogProps } from "@/interfaces";
import { Input } from "./ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
// import { trpc } from "@/utils/trpc";
import { toast } from "react-toastify";
import { Button } from "./ui/button";

const AuthDialog = ({ open, onClose }: TDialogProps) => {
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/cms/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ passphrase: input }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        onClose(false);
        setLoading(false);
        toast.success(
          "You’ve spoken the serpent’s true name. The system bows to you. granted. Welcome to the CMS."
        );
        router.push("/cms");
      } else {
        setLoading(false);
        toast.error(
          data.message || "The serpent hisses... your answer is false."
        );
      }
    } catch (error) {
      setLoading(false);
      console.error("Error during login:", error);
      toast.error("Something went wrong.");
    }
  };
  return (
    <Dialog onOpenChange={onClose} open={open}>
      <DialogContent className="max-w-xl">
        <div className="w-full flex flex-col gap-2">
          <q className="text-xl font bold text-center">
            Guess my eternal favorite beast!
          </q>
          <div className="w-full grid grid-cols-5 gap-2">
            <Input
              type="password"
              value={input}
              placeholder="Input here"
              onChange={(e) => setInput(e.target.value)}
              className="col-span-3"
            />
            <Button
              variant={"ghost"}
              disabled={loading}
              onClick={handleSubmit}
              className="cursor-pointer col-span-2"
            >
              {loading ? "Loading..." : "Im pretty sure it is!"}
            </Button>
          </div>
          <p className="text-xs">
            Hint : Venomous Beauty! - whisper its scientific name🐍
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
