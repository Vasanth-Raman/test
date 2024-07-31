import Gmail from "../assets/icons/gmail.svg";
import Chimp from "../assets/icons/mail-chimp.svg";
import Notion from "../assets/icons/notion.svg";
import BlueW from "../assets/icons/word-w.svg";
import WPress from "../assets/icons/wordpress.svg";
import Gcalendar from "../assets/icons/g-calendar.svg";
import NEight from "../assets/icons/n8n.svg";
import GDrive from "../assets/icons/g-drive.svg";

import Slack from "../assets/icons/slack.svg";
import Shopify from "../assets/icons/shopify.svg";
import AirTable from "../assets/icons/air-table.svg";
import GSheet from "../assets/icons/g-sheet.svg";
import Zapier from "../assets/icons/zapier.svg";
import Calendly from "../assets/icons/calendly.svg";
import Sforce from "../assets/icons/s-force.svg";

import Hidden from "../assets/icons/hidden-fields.svg";
import Collob from "../assets/icons/colloboration.svg";
import Link from "../assets/icons/link.svg";
import Code from "../assets/icons/code.svg";
import Domain from "../assets/icons/domain.svg";
import Folder from "../assets/icons/folder.svg";

import Iban from "../assets/icons/iban-icon.svg";
import Lemlist from "../assets/icons/lemlist-icon.svg";
import Maker from "../assets/icons/maker-icon.svg";
import Websharp from "../assets/icons/webisharp-icon.svg";
import Social from "../assets/icons/socialhack-icon.svg";
import Pinpoint from "../assets/icons/pinpoint-icon.svg";
import Bole from "../assets/icons/bole-icon.svg";
import Awsme from "../assets/icons/awsome-icon.svg";

import BubbleText from "../assets/icons/bubble-text-icon.svg";
import BubbleImage from "../assets/icons/bubble-image-icon.svg";
import BubbleVideo from "../assets/icons/bubble-video-icon.svg";
import BubbleGif from "../assets/icons/bubble-gif-icon.svg";

import InputText from "../assets/icons/input-text-icon.svg";
import InputNumber from "../assets/icons/input-number-icon.svg";
import InputEmail from "../assets/icons/input-email-icon.svg";
import InputPhone from "../assets/icons/input-phone-icon.svg";
import InputDate from "../assets/icons/input-date-icon.svg";
import InputRating from "../assets/icons/input-rating-icon.svg";
import InputButton from "../assets/icons/input-button-icon.svg";

export const imageDataTop = [
  { id: 1, icon: Gmail, alt: "Gmail Icon" },
  { id: 2, icon: Chimp, alt: "Mail Chimp Icon" },
  { id: 3, icon: Notion, alt: "Notion Icon" },
  { id: 4, icon: BlueW, alt: "Microsoft Word Icon" },
  { id: 5, icon: WPress, alt: "WordPress Icon" },
  { id: 6, icon: Gcalendar, alt: "Google Calendar Icon" },
  { id: 7, icon: NEight, alt: "n8n Icon" },
  { id: 8, icon: GDrive, alt: "Google Drive Icon" },
];

export const imageDataBottom = [
  { id: 1, icon: Slack, alt: "Slack Icon" },
  { id: 2, icon: Shopify, alt: "Shopify Icon" },
  { id: 3, icon: AirTable, alt: "AirTable Icon" },
  { id: 4, icon: GSheet, alt: "Google Sheets Icon" },
  { id: 5, icon: Zapier, alt: "Zapier Icon" },
  { id: 6, icon: Calendly, alt: "Calendly Icon" },
  { id: 7, icon: Sforce, alt: "Salesforce Icon" },
];

export const featureCardsData = [
  {
    id: 1,
    icon: Hidden,
    title: "Hidden Fields",
    subText: `Include data in your form URL to segment
your user and use its data directly in your
form.`,
  },
  {
    id: 2,
    icon: Collob,
    title: "Team collaboration",
    subText: `Invite your teammates to work on your
typebots with you`,
  },
  {
    id: 3,
    icon: Link,
    title: "Link to sub typebots",
    subText: `Reuse your typebots in different parent
bots.`,
  },
  {
    id: 4,
    icon: Code,
    title: "Custom code",
    subText: `Customize everything with your own
Javascript & CSS code`,
  },
  {
    id: 5,
    icon: Domain,
    title: "Custom domain",
    subText: `Connect your typebot to the custom URL
of your choice`,
  },
  {
    id: 6,
    icon: Folder,
    title: "Folder management",
    subText: `Organize your typebots in specific folders
to keep it clean and work with multiple
clients`,
  },
];

export const partnerCompanies = [
  {
    id: 1,
    src: Iban,
    alt: "IBAN Icon",
  },
  {
    id: 2,
    src: Lemlist,
    alt: "Lemlist Icon",
  },
  {
    id: 3,
    src: Maker,
    alt: "Maker Icon",
  },
  {
    id: 4,
    src: Websharp,
    alt: "Websharp Icon",
  },
  {
    id: 5,
    src: Social,
    alt: "Social Hack Icon",
  },
  {
    id: 6,
    src: Pinpoint,
    alt: "Pinpoint Icon",
  },
  {
    id: 7,
    src: Bole,
    alt: "Bole Icon",
  },
  {
    id: 8,
    src: Awsme,
    alt: "Awsome Icon",
  },
];

export const bubbleData = [
  {
    id: 1,
    name: "Text",
    icon: BubbleText,
    alt: "Text Bubble Icon",
    bubbleOrInput: "bubble",
    type: "text",
  },
  {
    id: 2,
    name: "Image",
    icon: BubbleImage,
    alt: "Image Bubble Icon",
    bubbleOrInput: "bubble",
    type: "image",
  },
  {
    id: 3,
    name: "Video",
    icon: BubbleVideo,
    alt: "Video Bubble Icon",
    bubbleOrInput: "bubble",
    type: "video",
  },
  {
    id: 4,
    name: "Gif",
    icon: BubbleGif,
    alt: "Gif Bubble Icon",
    bubbleOrInput: "bubble",
    type: "gif",
  },
];

export const inputData = [
  {
    id: 1,
    name: "Text",
    icon: InputText,
    alt: "Text Input Icon",
    bubbleOrInput: "input",
    type: "text",
  },
  {
    id: 2,
    name: "Number",
    icon: InputNumber,
    alt: "Number Input Icon",
    bubbleOrInput: "input",
    type: "number",
  },
  {
    id: 3,
    name: "Email",
    icon: InputEmail,
    alt: "Email Input Icon",
    bubbleOrInput: "input",
    type: "email",
  },
  {
    id: 4,
    name: "Phone",
    icon: InputPhone,
    alt: "Phone Input Icon",
    bubbleOrInput: "input",
    type: "phone",
  },
  {
    id: 5,
    name: "Date",
    icon: InputDate,
    alt: "Date Input Icon",
    bubbleOrInput: "input",
    type: "date",
  },
  {
    id: 6,
    name: "Rating",
    icon: InputRating,
    alt: "Rating Input Icon",
    bubbleOrInput: "input",
    type: "rating",
  },
  {
    id: 7,
    name: "Button",
    icon: InputButton,
    alt: "Button Input Icon",
    bubbleOrInput: "input",
    type: "button",
  },
];

export const bubbleTypeData = {
  text: {
    logoType: BubbleText,
    title: "Text",
    placeholder: "Click here to edit",
  },
  image: {
    logoType: BubbleImage,
    title: "Image",
    placeholder: "Click to add link",
  },
  video: {
    logoType: BubbleVideo,
    title: "Video",
    placeholder: "Click to add link",
  },
  gif: {
    logoType: BubbleGif,
    title: "GIF",
    placeholder: "Click to add link",
  },
};

export const inputTypeData = {
  text: {
    title: "Input Text",
    placeholder: "Hint: User will input a text on his form",
  },
  number: {
    title: "Input Number",
    placeholder: "Hint: User will input a number on his form",
  },
  email: {
    title: "Input Email",
    placeholder: "Hint: User will input a email on his form",
  },
  phone: {
    title: "Input Phone",
    placeholder: "Hint: User will input a phone on his form",
  },
  date: {
    title: "Input Date",
    placeholder: "Hint: User will input a date on his form",
  },
  rating: {
    title: "Input Rating",
    placeholder: "Hint: User will tap to rate out of 5",
  },
};
