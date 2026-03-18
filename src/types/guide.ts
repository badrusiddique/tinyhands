export interface GuideFAQ {
  question: string
  answer: string
}

export interface GuideSection {
  heading: string
  body: string
}

export interface Guide {
  slug: string
  title: string
  description: string
  sections: GuideSection[]
  faqs: GuideFAQ[]
}
