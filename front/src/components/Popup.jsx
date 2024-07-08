import { Button, DialogHeader, DialogFooter } from "@material-tailwind/react"
import { motion } from "framer-motion"

const Popup = (props) => {
  const { msg, open, handleOpen, positive } = props

  return (
    <>
      {open ? (
        <div className="fixed inset-0 flex items-center justify-center z-50 mb-32 h-screen backdrop-blur-sm">
          <motion.div
            className={"rounded-xl"}
            initial={popVariant.hidden}
            animate={popVariant.visible}
          >
            <div
              className={`flex justify-between flex-col h-56 w-80 md:w-128 rounded-xl shadow-xl relative 
                ${positive ? "bg-green-500" : "bg-redPrimary"}`}
            >
              <DialogHeader className="text-white font-montserrat font-bold">
                {msg}
              </DialogHeader>
              <DialogFooter>
                <Button
                  className="flex justify-end bg-transparent text-white hover:scale-110"
                  onClick={handleOpen}
                >
                  <span>ok</span>
                </Button>
              </DialogFooter>
            </div>
          </motion.div>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export const popVariant = {
  hidden: {
    opacity: 0,
    y: -100,
  },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
  },
  transition: {
    type: "spring",
    stiffness: 150,
    damping: 100,
  },
}

export default Popup
