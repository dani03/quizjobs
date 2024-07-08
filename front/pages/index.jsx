import { AppContext } from "../src/components/AppContext"
import NavBar from "../src/components/NavBar"
import { Card, Button } from "@material-tailwind/react"
import { motion } from "framer-motion"
import { useContext } from "react"
import ParticlesComponent from "../src/components/ParticlesComponent"
import Link from "next/link"

const Home = () => {
  const { jwt, logout, isError, myProfile } = useContext(AppContext)

  return (
    <>
      <ParticlesComponent isError={isError} />
      <div
        className={`h-screen bg-cover ${
          !isError ? "md:bg-normal bg-mobile" : "md:bg-error bg-error_mobile"
        }`}
      >
        <NavBar jwt={jwt} logout={logout} myProfile={myProfile} />
        <Card className="bg-transparent" shadow={false}>
          <motion.ul
            className="mt-16 mx-auto"
            initial="hidden"
            animate="visible"
            variants={list}
          >
            <motion.li variants={item}>
              <p className="text-zinc-900 md:text-4xl text-2xl text-center font-dancing md:-mb-12 -mb-8 text-shadow-lg shadow-gray-900/50">
                Unlock Potential
              </p>
            </motion.li>
            <motion.li variants={item}>
              <p className="md:text-5xl whitespace-nowrap text-45xl text-center text-zinc-100 font-bold font-passion md:-mb-32 -mb-16 text-shadow-lg shadow-gray-900/50">
                JOB'IN
              </p>
              <p className="md:text-5xl whitespace-nowrap text-45xl text-center text-zinc-100 font-bold font-passion md:-mb-12 -mb-8 text-shadow-lg shadow-gray-900/50">
                QUIZ
              </p>
            </motion.li>
            <motion.li variants={item}>
              <p className="text-zinc-900 md:text-4xl text-2xl text-center font-dancing mx-auto  text-shadow-lg shadow-gray-900/50">
                Discover Talent
              </p>
            </motion.li>
          </motion.ul>
          <Link className="mx-auto" href="/pricing">
            <Button className="mt-32 w-64 bg-purplePrimary shadow-xl">
              Try out now
            </Button>
          </Link>
        </Card>
      </div>
    </>
  )
}

export const list = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.5,
    },
  },
  hidden: { opacity: 0 },
}
export const item = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -100 },
  transition: {
    when: "afterChildren",
  },
}

export default Home
