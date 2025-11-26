import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Shield, Zap, CheckCircle } from "lucide-react"

export default function GiveDetails() {
  const [brand, setBrand] = useState("Unknown")
  const [bank, setBank] = useState("")
  const [flipped, setFlipped] = useState(false)
  const [bg, setBg] = useState("bg-gradient-to-br from-[#1a1f3c] to-[#0f1324]")

  function detect(numRaw) {
    var num = numRaw.replace(/ /g, "")
    var b = "Unknown"
    var g = "bg-gradient-to-br from-[#1a1f3c] to-[#0f1324]"

    if (/^4/.test(num)) {
      b = "Visa"
      g = "bg-gradient-to-br from-blue-600 to-blue-300"
    } else if (/^5[1-5]/.test(num)) {
      b = "Mastercard"
      g = "bg-gradient-to-br from-orange-500 to-yellow-400"
    } else if (/^6/.test(num)) {
      b = "Rupay"
      g = "bg-gradient-to-br from-green-600 to-emerald-400"
    }

    var bin = num.substring(0, 6)
    var banks = {
      HDFC: ["438628", "498824", "512345"],
      ICICI: ["431933", "547999", "606333"],
      SBI: ["622018", "414345", "517652"],
      AXIS: ["507732", "539999", "652150"],
      KOTAK: ["511587", "459111", "620154"],
      BOB: ["436518", "552521", "604845"]
    }

    var detectedBank = ""
    for (var k in banks) {
      if (banks[k].indexOf(bin) !== -1) detectedBank = k
    }

    setBrand(b)
    setBg(g)
    setBank(detectedBank)
  }

  return (
    <div className="min-h-screen w-full bg-[#0a0d1a] text-white p-8 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl space-y-10"
      >
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-white">Enter Card Details</h1>
          <p className="text-gray-400 text-sm">
            Your information is encrypted and never stored.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {[
            { icon: <Shield />, label: "Bank-Grade Security" },
            { icon: <Zap />, label: "Instant Verification" },
            { icon: <CheckCircle />, label: "Secure Processing" }
          ].map(function(it, i) {
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center justify-center bg-white/5 border border-white/10 p-4 rounded-xl"
              >
                {it.icon}
                <span className="text-gray-300 text-sm mt-2">{it.label}</span>
              </motion.div>
            )
          })}
        </div>

        <div className="flex justify-center">
          <motion.div
            className={
              "w-80 h-48 rounded-2xl text-white p-6 shadow-xl border border-white/10 relative " +
              bg
            }
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.6 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className="absolute inset-0"
              style={{ backfaceVisibility: "hidden" }}
            >
              <p className="text-sm opacity-80">{bank || "Your Bank"}</p>
              <p className="text-2xl tracking-widest mt-6">
                #### #### #### ####
              </p>
              <p className="text-sm mt-6 opacity-80">{brand}</p>
            </div>

            <div
              className="absolute inset-0"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)"
              }}
            >
              <div className="w-full h-10 bg-black mt-6"></div>
              <div className="flex justify-end pr-4 mt-6">
                <div className="bg-white text-black w-16 h-6 rounded text-center font-bold">
                  ***
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <Tabs defaultValue="financial" className="w-full">
          <TabsList className="bg-white/5 border border-white/10 rounded-xl p-1">
            <TabsTrigger value="financial">Financial Info</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="financial">
            <Card className="bg-white/5 border-white/10">
              <CardContent className="grid grid-cols-2 gap-6 p-6">
                <Input
                  placeholder="Card Holder Name"
                  className="bg-white/10 border-white/20"
                />

                <Input
                  placeholder="Card Number"
                  className="bg-white/10 border-white/20"
                  onChange={function(e) {
                    detect(e.target.value)
                  }}
                />

                <div className="text-sm text-gray-300">Brand: {brand}</div>
                <div className="text-sm text-gray-300">
                  Bank: {bank || "Detecting..."}
                </div>

                <Input
                  placeholder="Expiry Date (MM/YY)"
                  className="bg-white/10 border-white/20"
                />

                <Input
                  placeholder="CVV"
                  type="password"
                  className="bg-white/10 border-white/20"
                  onFocus={function() {
                    setFlipped(true)
                  }}
                  onBlur={function() {
                    setFlipped(false)
                  }}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="bg-white/5 border-white/10 p-6">
              <p className="text-gray-300 text-sm">
                All details are encrypted end-to-end.
              </p>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-center">
          <Button className="px-8 py-6 text-lg rounded-xl bg-blue-600 hover:bg-blue-500">
            Submit
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
