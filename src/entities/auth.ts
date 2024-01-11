export type UserData = {
  email: '9jacodetech@gmail.com';
  emailIsVerified: 'true';
};
export type LoginResponse = {
  user: UserData;
  token: string;
};

export type SlideContentInput = {
  title: string;
  description: string;
  button1URL: string;
  button2URL: string;
  button1Label: string;
  button2Label: string;
  imageURLs: string[];
};
