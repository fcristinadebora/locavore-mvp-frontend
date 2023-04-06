import { createRouter, createWebHistory } from "vue-router";

import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import RegisterType from "../pages/RegisterType.vue";
import RegisterSuccess from "../pages/RegisterSuccess.vue";
import LoginSuccess from "../pages/LoginSuccess.vue";
import RegisterSignupForm from "../pages/RegisterSignupForm.vue";
import SearchLocation from "../pages/SearchLocation.vue";
import SearchResult from "../pages/SearchResult.vue";
import QuizStart from "../pages/QuizStart.vue";
import QuizProfilePicture from "../pages/QuizProfilePicture.vue";
import QuizCategories from "../pages/QuizCategories.vue";
import QuizShortDescription from "../pages/QuizShortDescription.vue";
import QuizLongDescription from "../pages/QuizLongDescription.vue";
import QuizAddress from "../pages/QuizAddress.vue";
import QuizContact from "../pages/QuizContact.vue";
import QuizSuccess from "../pages/QuizSuccess.vue";
import ProductDetails from "../pages/ProductDetails.vue";
import ProducerDetails from "../pages/ProducerDetails.vue";
import ForgotPassword from "../pages/ForgotPassword.vue";
import ProfileAndSecurity from "../pages/ProfileAndSecurity.vue";
import MyFavorites from "../pages/MyFavorites.vue";
import ProducerProfile from "../pages/ProducerProfile.vue";
import AccountDeletionSuccess from "../pages/AccountDeletionSuccess.vue";
import QuizProducerName from "../pages/QuizProducerName.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/login/success",
      name: "loginSuccess",
      component: LoginSuccess,
    },
    {
      path: "/forgot-password",
      name: "forgotPassword",
      component: ForgotPassword,
    },
    {
      path: "/register", //todo multilanguage routes
      name: "registerType",
      component: RegisterType,
    },
    {
      path: "/register/signup",
      name: "registerSignup",
      component: RegisterSignupForm,
    },
    {
      path: "/register/success", //todo multilanguage routes
      name: "registersuccess",
      component: RegisterSuccess,
    },
    {
      path: "/quiz",
      name: "quizStart",
      component: QuizStart,
    },
    {
      path: "/quiz/name",
      name: "quizProducerName",
      component: QuizProducerName,
    },
    {
      path: "/quiz/profile-picture",
      name: "quizProfilePicture",
      component: QuizProfilePicture,
    },
    {
      path: "/quiz/categories",
      name: "quizCategories",
      component: QuizCategories,
    },
    {
      path: "/quiz/short-description",
      name: "quizShortDescription",
      component: QuizShortDescription,
    },
    {
      path: "/quiz/long-description",
      name: "quizLongDescription",
      component: QuizLongDescription,
    },
    {
      path: "/quiz/address",
      name: "quizAddress",
      component: QuizAddress,
    },
    {
      path: "/quiz/contact",
      name: "quizContact",
      component: QuizContact,
    },
    {
      path: "/quiz/success",
      name: "QuizSuccess",
      component: QuizSuccess,
    },
    {
      path: "/search/location/", //todo multilanguage routes
      name: "searchLocation",
      component: SearchLocation,
    },
    {
      path: "/search/result",
      name: "SearchResult",
      component: SearchResult,
    },
    {
      path: "/product/:id",
      name: "ProductDetails",
      component: ProductDetails,
    },
    {
      path: "/producer/:id",
      name: "producerDetails",
      component: ProducerDetails,
    },
    {
      path: "/account/profile",
      name: "profileAndSecurity",
      component: ProfileAndSecurity
    },
    {
      path: "/account/favorites/:type",
      name: "myFavorites",
      component: MyFavorites
    },
    {
      path: "/account/producer-profile",
      name: "producerProfile",
      component: ProducerProfile
    },
    {
      path: "/goodbye",
      name: "goodbye",
      component: AccountDeletionSuccess
    }
  ],
});

router.beforeEach(async (from, to) => {
  console.log('redirect')

  window.scrollTo(0, 0);
});

export default router;
