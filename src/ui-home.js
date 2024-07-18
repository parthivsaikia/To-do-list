import woman1 from "./images/sarah.jpeg";
import man1 from "./images/man1.jpeg";
import man2 from "./images/man2.jpg";
import woman2 from "./images/woman2.jpg";

function makeElement(name, className) {
  const element = document.createElement(name);
  element.classList.add(className);
  return element;
}

function heroSection() {
  const heroSectionDiv = makeElement("div", "hero-section-div");
  const heroSectionInfoDiv = makeElement("div", "hero-section-info-div");
  const heroSectionInfoHeading = makeElement("h1", "hero-section-info-heading");
  const heroSectionInfoPara = makeElement("p", "hero-section-info-para");
  const heroInfoBtn = makeElement("button", "hero-info-button");

  heroSectionInfoHeading.textContent = "Boost your Productivity";
  heroSectionInfoPara.textContent =
    "Todo X helps your manage your time efficiently";
  heroInfoBtn.textContent = "Get Started";
  heroSectionInfoDiv.append(
    heroSectionInfoHeading,
    heroSectionInfoPara,
    heroInfoBtn
  );

  const heroImageDiv = makeElement("div", "hero-image-div");

  heroSectionDiv.append(heroSectionInfoDiv, heroImageDiv);
  return heroSectionDiv;
}

function customerReviewSection() {
  const customerReviewSectionDiv = makeElement(
    "div",
    "customer-review-section-div"
  );
  function makeReviewCard(name, review, date, stars, imageSrc) {
    const reviewCard = makeElement("div", "review-card");
    const starAndDateDiv = makeElement("div", "star-and-date-div");
    const starSection = makeElement("span", "star-section");
    for (let i = 0; i < stars; i++) {
      starSection.textContent += "⭐";
    }
    const dateSection = makeElement("span", "date-section");
    dateSection.textContent = date;
    starAndDateDiv.append(starSection, dateSection);
    const reviewSection = makeElement("p", "review-section");
    reviewSection.textContent = `"${review}"`;
    const nameAndImageDiv = makeElement("div", "name-and-image-div");
    const imageDiv = makeElement("div", "image-div");
    const image = new Image();
    image.src = imageSrc;
    imageDiv.append(image);
    const namePara = makeElement("p", "name-para");
    namePara.textContent = name;
    nameAndImageDiv.append(imageDiv, namePara);
    reviewCard.append(starAndDateDiv, reviewSection, nameAndImageDiv);

    customerReviewSectionDiv.append(reviewCard);
  }

  makeReviewCard(
    "Sarah Johnson",
    "TODO X has transformed the way I organize my day! The intuitive interface and seamless syncing across devices keep me on top of my tasks, no matter where I am.",
    "10-01-2022",
    5,
    woman1
  );
  makeReviewCard(
    "Michael Brown",
    "I've tried countless to-do list apps, but TODO X stands out with its simplicity and effectiveness. The reminders and prioritization features are game changers!",
    "15-10-2022",
    5,
    man1
  );
  makeReviewCard(
    "Emily Davis",
    '"Managing my personal and work tasks has never been easier. TODO X’s ability to create separate lists and set deadlines helps me stay focused and productive."',
    "20-01-2023",
    5,
    woman2
  );
  makeReviewCard(
    "David Wilson",
    "I love the clean design of TODO X. It's straightforward, easy to use, and has just the right features without being overwhelming. Highly recommend it to anyone looking to get organized.",
    "21-05-2023",
    5,
    man2
  );

  return customerReviewSectionDiv;
}

export function homePage() {
  const homePageDiv = makeElement("div", "home-page-div");
  homePageDiv.append(heroSection(), customerReviewSection());
  return homePageDiv;
}
