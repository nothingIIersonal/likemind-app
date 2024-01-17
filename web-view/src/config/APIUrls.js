const AuthLoginURL = process.env.REACT_APP_API_URL + "/auth/login";
const RegisterURL = process.env.REACT_APP_API_URL + "/register";
const ProfileURL = process.env.REACT_APP_API_URL + "/profile";
const RetrieveAllPlacemarksURL =
  process.env.REACT_APP_API_URL + "/map/retrieve-all-placemarks";
const UpdateProfileURL = process.env.REACT_APP_API_URL + "/profile/update";

export {
  AuthLoginURL,
  RegisterURL,
  ProfileURL,
  RetrieveAllPlacemarksURL,
  UpdateProfileURL,
};
