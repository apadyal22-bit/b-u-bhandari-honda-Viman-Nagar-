import { VisitType, StarRating } from '../types';

interface ReviewInput {
  location: string;
  visitType: VisitType;
  rating: StarRating;
  highlights: string[];
  employeeName?: string;
  teamDepartment?: string;
  additionalRemarks?: string;
  variationIndex?: number;
}

export function generateReviewText(input: ReviewInput): string {
  const {
    location,
    visitType,
    rating,
    highlights = [],
    employeeName,
    teamDepartment,
    additionalRemarks,
    variationIndex = 0,
  } = input;

  const loc = location.trim() || 'B.U. Bhandari Honda';
  const staff = employeeName?.trim();
  const dept = teamDepartment?.trim();
  const remarks = additionalRemarks?.trim();

  // Helper for staff/team mention
  const getStaffSentence = (style: 'positive' | 'neutral' | 'critical'): string => {
    if (!staff && !dept) return '';
    if (staff && dept) {
      if (style === 'positive') {
        const templates = [
          `Special thanks to ${staff} from the ${dept} team for the courteous assistance and support.`,
          `A big thank you to ${staff} (${dept}) for guiding us smoothly through the process.`,
          `Kudos to ${staff} from the ${dept} department for their attentive and professional approach.`,
        ];
        return templates[variationIndex % templates.length];
      }
      return `Our interaction was with ${staff} from the ${dept} team.`;
    }
    if (staff) {
      if (style === 'positive') {
        const templates = [
          `Special appreciation to ${staff} for being very helpful and attentive throughout.`,
          `Thanks to ${staff} for ensuring everything was handled smoothly.`,
          `Would like to mention ${staff} for their kind support and guidance.`,
        ];
        return templates[variationIndex % templates.length];
      }
      return `We interacted with ${staff}.`;
    }
    if (dept) {
      if (style === 'positive') {
        return `The ${dept} team was proactive and responsive.`;
      }
      return `Feedback pertains mainly to the ${dept} department.`;
    }
    return '';
  };

  // Helper for highlights sentence
  const getHighlightsSentence = (isPositive: boolean): string => {
    if (highlights.length === 0) return '';
    const formatted = highlights.map((h) => h.toLowerCase());
    const listStr =
      formatted.length === 1
        ? formatted[0]
        : formatted.length === 2
        ? `${formatted[0]} and ${formatted[1]}`
        : `${formatted.slice(0, -1).join(', ')}, and ${formatted[formatted.length - 1]}`;

    if (isPositive) {
      const templates = [
        `I particularly appreciated the ${listStr}.`,
        `The ${listStr} really stood out during my visit.`,
        `Everything from the ${listStr} was handled very nicely.`,
      ];
      return templates[variationIndex % templates.length];
    } else {
      return `The visit included aspects of ${listStr}.`;
    }
  };

  // Visit type specific sentence structures based on Star Rating
  let introSentence = '';
  let middleSentence = '';
  let closingSentence = '';

  if (rating === 5) {
    // 5 Stars - Highly positive & genuine
    if (visitType === 'purchase') {
      const intros = [
        `Had an outstanding experience purchasing my two-wheeler at ${loc}.`,
        `Buying my new vehicle at ${loc} was an absolute breeze and very pleasant.`,
        `Very happy with my new vehicle purchase journey at ${loc}.`,
      ];
      const middles = [
        `The entire sales process was seamless, transparent, and prompt with clear explanations of vehicle specifications and documentation.`,
        `The team explained all features clearly and ensured a quick, hassle-free booking and paperwork procedure.`,
        `The showroom ambiance is welcoming, and the team provided thorough guidance on all models and finance options.`,
      ];
      const closings = [
        `Highly recommend this dealership to anyone looking to buy a Honda vehicle!`,
        `Truly impressed by the dealership's hospitality and customer-first attitude.`,
        `A trustworthy dealership with reliable guidance and great professionalism.`,
      ];
      introSentence = intros[variationIndex % intros.length];
      middleSentence = middles[variationIndex % middles.length];
      closingSentence = closings[variationIndex % closings.length];
    } else if (visitType === 'service') {
      const intros = [
        `Visited ${loc} for vehicle servicing and had a top-notch experience.`,
        `My Honda two-wheeler service at ${loc} was completed thoroughly and on schedule.`,
        `Very satisfied with the periodic service quality and responsiveness at ${loc}.`,
      ];
      const middles = [
        `The service advisors listened carefully to the issues and explained the job card clearly. The vehicle was delivered clean and running smooth.`,
        `Appreciated the prompt job estimation, timely updates, and quality of mechanical workmanship.`,
        `The turnaround time was quick and billing was completely transparent with zero unnecessary charges.`,
      ];
      const closings = [
        `Definitely my go-to service center for regular maintenance and care.`,
        `Great job by the service crew. Highly recommended for authorized Honda servicing!`,
        `Reliable service center with well-trained technicians.`,
      ];
      introSentence = intros[variationIndex % intros.length];
      middleSentence = middles[variationIndex % middles.length];
      closingSentence = closings[variationIndex % closings.length];
    } else {
      // Vehicle Delivery
      const intros = [
        `Took delivery of my new Honda at ${loc}, and the experience was truly memorable!`,
        `The vehicle delivery ceremony and handover process at ${loc} was organized and delightful.`,
        `Had a seamless and joyous delivery experience at ${loc}.`,
      ];
      const middles = [
        `The vehicle was thoroughly polished and ready on time. All keys, documents, and warranty details were explained patiently.`,
        `The team made the key handover feel special and answered all our queries before we rode out.`,
        `Complete documentation, insurance papers, and bike features were demonstrated with great attention to detail.`,
      ];
      const closings = [
        `Thank you ${loc} for making our delivery day so memorable!`,
        `A flawless handover experience from start to finish.`,
        `Kudos to the team for their warmth and timely execution.`,
      ];
      introSentence = intros[variationIndex % intros.length];
      middleSentence = middles[variationIndex % middles.length];
      closingSentence = closings[variationIndex % closings.length];
    }
  } else if (rating === 4) {
    // 4 Stars - Positive & realistic
    if (visitType === 'purchase') {
      introSentence = `Good experience overall while purchasing my vehicle at ${loc}.`;
      middleSentence = `The team was polite and helpful, guiding us through the options and booking procedures smoothly.`;
      closingSentence = `Overall a smooth process and I would recommend visiting this branch.`;
    } else if (visitType === 'service') {
      introSentence = `Got my vehicle serviced at ${loc} and was pleased with the service quality.`;
      middleSentence = `The bike rides much better now and the scheduled work was carried out responsibly.`;
      closingSentence = `Good, dependable authorized service facility.`;
    } else {
      introSentence = `Had a good vehicle delivery experience at ${loc}.`;
      middleSentence = `The handover was completed well with clear instructions on features and paperwork.`;
      closingSentence = `Appreciate the team's support in ensuring a timely delivery.`;
    }
  } else if (rating === 3) {
    // 3 Stars - Balanced & polite
    if (visitType === 'purchase') {
      introSentence = `Visited ${loc} for a new vehicle purchase.`;
      middleSentence = `The purchase was completed satisfactorily, though there is scope for faster processing and better communication during peak hours.`;
      closingSentence = `Decent overall experience with room for small improvements.`;
    } else if (visitType === 'service') {
      introSentence = `Had my vehicle serviced at ${loc}.`;
      middleSentence = `The regular maintenance was taken care of, although delivery took slightly longer than initial estimation.`;
      closingSentence = `Average service experience that could be even better with quicker turnarounds.`;
    } else {
      introSentence = `Took delivery of my vehicle at ${loc}.`;
      middleSentence = `The basic handover was handled fine, though coordination and waiting times could be streamlined.`;
      closingSentence = `Satisfactory delivery experience overall.`;
    }
  } else if (rating === 2) {
    // 2 Stars - Polite constructive feedback
    if (visitType === 'purchase') {
      introSentence = `Sharing feedback regarding my purchase visit at ${loc}.`;
      middleSentence = `While the vehicle itself is good, the sales coordination and processing time needed more proactive follow-up and clarity.`;
      closingSentence = `Hope management focuses on improving customer response times and communication.`;
    } else if (visitType === 'service') {
      introSentence = `Visited ${loc} for vehicle servicing.`;
      middleSentence = `Felt the service turnaround and explanation of charges could have been handled much better by the team.`;
      closingSentence = `Sharing this constructive feedback in hopes of seeing improved customer service in the future.`;
    } else {
      introSentence = `Feedback regarding my vehicle delivery at ${loc}.`;
      middleSentence = `There were noticeable delays on the delivery day and paperwork coordination could have been smoother.`;
      closingSentence = `Requesting the team to improve delivery readiness and scheduling.`;
    }
  } else {
    // 1 Star - Respectful feedback-oriented
    if (visitType === 'purchase') {
      introSentence = `Disappointed with my recent visit to ${loc} for vehicle purchase.`;
      middleSentence = `Encountered unexpected delays, lack of timely updates, and inconsistent communication regarding the purchase process.`;
      closingSentence = `Hope the dealership takes customer feedback seriously and streamlines their showroom management.`;
    } else if (visitType === 'service') {
      introSentence = `Sharing honest feedback regarding my service visit at ${loc}.`;
      middleSentence = `The servicing experience fell below expectations due to delays, poor status communication, and unresolved queries.`;
      closingSentence = `Hoping the management reviews service floor standards and addresses customer concerns promptly.`;
    } else {
      introSentence = `The vehicle delivery experience at ${loc} was frustrating and disorganized.`;
      middleSentence = `Faced long waiting times despite prior scheduling, and key details were rushed during handover.`;
      closingSentence = `Expecting better coordination and customer care from an authorized dealership.`;
    }
  }

  // Assemble sentences
  const isPositive = rating >= 4;
  const staffSentence = getStaffSentence(isPositive ? 'positive' : rating === 3 ? 'neutral' : 'critical');
  const highlightsSentence = getHighlightsSentence(isPositive);

  const parts: string[] = [introSentence];
  if (middleSentence) parts.push(middleSentence);
  if (highlightsSentence) parts.push(highlightsSentence);
  if (staffSentence) parts.push(staffSentence);
  if (remarks) {
    // Append customer's custom remarks
    parts.push(remarks.endsWith('.') ? remarks : `${remarks}.`);
  }
  if (closingSentence) parts.push(closingSentence);

  return parts.filter(Boolean).join(' ');
}
