import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/effect-cards"
import { EffectCards } from "swiper/modules"
import NavBar from "../src/components/NavBar"
import { AppContext } from "../src/components/AppContext"
import { useContext } from "react"
import { Card } from "@material-tailwind/react"
import { useMediaQuery } from "@mui/material"
import PricingCard from "../src/components/PricingCard"

const planList = [
  {
    title: "Basic",
    description: "Our free plan for non profesionnal work",
    price: "FREE",
    advantages: [
      { isChecked: "true", description: "Access to all basic quiz" },
      { isChecked: "false", description: "Access to  manager's account" },
      { isChecked: "false", description: "Access to all custom quiz database" },
      {
        isChecked: "false",
        description: "Possibility to create personalized quiz",
      },
    ],
    buttonLabel: "Try now",
  },
  {
    title: "Pro",
    description: "Provides access to a manager account",
    price: "$25,99",
    advantages: [
      { isChecked: "true", description: "Access to all basic quiz" },
      { isChecked: "true", description: "Access to  manager's account" },
      { isChecked: "true", description: "Access to all custom quiz database" },
      {
        isChecked: "false",
        description: "Possibility to create personalized quiz",
      },
    ],
    buttonLabel: "Buy now",
  },
  {
    title: "PRENIUM",
    description: "Access to Pro Plan benefits + ability to create new quizzes",
    price: "$49,99",
    advantages: [
      { isChecked: "true", description: "Access to all basic quiz" },
      { isChecked: "true", description: "Access to  manager's account" },
      { isChecked: "true", description: "Access to all custom quiz database" },
      {
        isChecked: "true",
        description: "Possibility to create custom quiz",
      },
    ],
    buttonLabel: "Buy now",
  },
]

const Pricing = () => {
  const { jwt, logout, myProfile } = useContext(AppContext)
  const isMediumOrSmallScreen = useMediaQuery("(max-width: 1024px)")

  return (
    <div className="h-screen bg-cover md:bg-normal bg-mobile">
      <NavBar jwt={jwt} logout={logout} myProfile={myProfile} />
      <Card className="bg-transparent mt-8" shadow={false}>
        <h1 className="md:text-45xl text-4xl text-center text-zinc-100 font-bold font-passion text-shadow-lg shadow-gray-900/50">
          Our pricing & plan
        </h1>
        {isMediumOrSmallScreen ? (
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards]}
            className="mySwiper mt-16"
          >
            <SwiperSlide className="bg-pricing bg-cover">
              <PricingCard planData={planList[0]} />
            </SwiperSlide>
            <SwiperSlide className="bg-normal bg-cover">
              <PricingCard planData={planList[1]} />
            </SwiperSlide>
            <SwiperSlide className="bg-error bg-cover">
              <PricingCard planData={planList[2]} />
            </SwiperSlide>
          </Swiper>
        ) : (
          <div className="grid grid-cols-3 grid-gap-2 mt-16">
            <PricingCard planData={planList[0]} />
            <PricingCard planData={planList[1]} />
            <PricingCard planData={planList[2]} />
          </div>
        )}
      </Card>
    </div>
  )
}

export default Pricing
