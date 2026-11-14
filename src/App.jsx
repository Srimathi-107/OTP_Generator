
import { useState } from "react";
import "./App.css";
import { User, Mail } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");

  const [otpform, setOtpform] = useState(false);

  function handlesendotp(e) {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter your name!");
      return;
    }

    if (!email.trim()) {
      toast.error("Please enter your email!");
      return;
    }

    const random = Math.floor(100000 + Math.random() * 900000);

    setGeneratedOtp(random.toString());
    setOtpform(true);
    setOtp("");

    toast.success(`OTP is ${random}`);
  }

  function handleverify(e) {
    e.preventDefault();

    if (!otp) {
      toast.error("Please enter OTP!");
      return;
    }

    if (otp === generatedOtp) {
      toast.success("OTP Verified Successfully!");
    } else {
      toast.error("Invalid OTP!");
    }
  }

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center bg-[#ddd]">

        <form
          className="flex justify-center items-center gap-6 flex-col shadow-lg p-8 rounded-lg bg-white w-[350px]"
          onSubmit={otpform ? handleverify : handlesendotp}
        >

          <h1 className="text-2xl font-bold">Login</h1>

          {!otpform && (
            <>
              {/* Name Input */}
              <div className="relative w-full">

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  className="w-full border border-gray-400 rounded-lg p-3 pr-10 focus:outline-none focus:border-green-500"
                />

                <User
                  size={22}
                  className="absolute right-3 top-3"
                />

              </div>

              {/* Email Input */}
              <div className="relative w-full">

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full border border-gray-400 rounded-lg p-3 pr-10 focus:outline-none focus:border-green-500"
                />

                <Mail
                  size={22}
                  className="absolute right-3 top-3"
                />

              </div>

              <button
                type="submit"
                className="w-full bg-green-500 text-white rounded-lg p-2 hover:bg-green-600"
              >
                Send OTP
              </button>
            </>
          )}

          {otpform && (
            <>
              <p className="text-gray-500 text-sm">
                OTP sent to {email}
              </p>

              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, ""))
                }
                placeholder="Enter 6 digit OTP"
                className="w-full border border-gray-400 rounded-lg p-3 focus:outline-none focus:border-green-500"
              />

              <button
                type="submit"
                className="w-full bg-green-500 text-white rounded-lg p-2 hover:bg-green-600"
              >
                Verify OTP
              </button>

              <button
                type="button"
                className="w-full bg-red-500 text-white rounded-lg p-2 hover:bg-red-600"
                onClick={handlesendotp}
              >
                Resend OTP
              </button>
            </>
          )}

        </form>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={8000}
        theme="colored"
      />
    </>
  );
}
