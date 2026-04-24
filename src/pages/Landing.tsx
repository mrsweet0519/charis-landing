import {
  BadgeCheck,
  BookOpen,
  CalendarClock,
  Check,
  Play,
  Quote,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import { CTAButton } from '../components/landing/CTAButton';
import { Reveal } from '../components/landing/Reveal';

const CTA_LINK = '#apply';
const DEADLINE = new Date('2026-05-10T23:59:59+09:00').getTime();

const problemPoints = [
  '기술은 있는데 예약이 늘 제자리',
  '후기는 있는데 브랜드는 약한 상태',
  '매번 내가 설명해야만 움직이는 구조',
];

const solutionSteps = [
  {
    step: '01',
    title: '결과가 먼저 보이게 정리',
    text: '고객이 멈추는 첫 화면부터 다시 만듭니다.',
  },
  {
    step: '02',
    title: '고객이 이해하는 문장으로 전환',
    text: '잘하는 설명이 아니라 선택되는 설명으로 바꿉니다.',
  },
  {
    step: '03',
    title: '상담과 신청으로 이어지는 흐름 설계',
    text: '좋아요에서 끝나지 않게 CTA까지 연결합니다.',
  },
];

const reviews = [
  {
    persona: '아이 키우며 시간 없던 원장',
    result: '문의 톤이 달라졌어요',
    messages: [
      '예전엔 가격만 묻고 끝났는데',
      '이제는 분위기랑 수강 방식부터 물어봐요',
      '진짜 신청 의사가 있는 분들이 늘었어요',
    ],
  },
  {
    persona: '매출 200에서 멈췄던 원장',
    result: '예약 흐름이 다시 움직였어요',
    messages: [
      '콘텐츠를 더 올리는 게 답인 줄 알았는데',
      '페이지 흐름 바꾸고 나서 상담 전환이 달라졌어요',
      '왜 여기여야 하는지가 먼저 읽히더라고요',
    ],
  },
  {
    persona: '광고 없이 버티던 소규모 샵',
    result: '수강 문의가 더 진해졌어요',
    messages: [
      '가벼운 문의보다 진지한 카톡이 많아졌어요',
      '바로 배우고 싶다고 먼저 말해주시는 분들이 생겼어요',
    ],
  },
];

const curriculum = [
  '결과를 먼저 설득하는 랜딩 구조',
  '예약이 움직이는 문장 설계',
  '시술 Before/After 배치 방식',
  '후기와 사례를 전환형으로 보여주는 법',
  '카톡 문의로 이어지는 CTA 구조',
  '바로 적용할 실전 체크리스트',
];

function getCountdown(targetTime: number) {
  const remaining = Math.max(targetTime - Date.now(), 0);
  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((remaining / (1000 * 60)) % 60);
  const seconds = Math.floor((remaining / 1000) % 60);

  return [
    { label: 'days', value: String(days).padStart(2, '0') },
    { label: 'hours', value: String(hours).padStart(2, '0') },
    { label: 'mins', value: String(minutes).padStart(2, '0') },
    { label: 'secs', value: String(seconds).padStart(2, '0') },
  ];
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/20 bg-[#111111] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#F5E6B3]">
      <BadgeCheck className="h-3.5 w-3.5 text-[#D4AF37]" />
      <span>{children}</span>
    </div>
  );
}

function Frame({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] backdrop-blur-sm ${className}`.trim()}
    >
      {children}
    </div>
  );
}

function KakaoReview({
  persona,
  result,
  messages,
}: {
  persona: string;
  result: string;
  messages: string[];
}) {
  return (
    <Frame className="h-full p-5 transition duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/30 hover:shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[#D4AF37]">Student Story</p>
          <p className="mt-2 text-lg font-semibold text-white">{persona}</p>
        </div>
        <div className="rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#F5E6B3]">
          {result}
        </div>
      </div>

      <div className="mt-5 rounded-[1.5rem] border border-white/8 bg-[#131313] p-4">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FEE500] text-black">
            <Quote className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">카톡 후기</p>
            <p className="text-xs uppercase tracking-[0.18em] text-white/35">Real Conversation Style</p>
          </div>
        </div>

        <div className="space-y-3">
          {messages.map((message, index) => (
            <div
              key={message}
              className={`max-w-[88%] rounded-[1.2rem] px-4 py-3 text-sm leading-6 ${
                index % 2 === 0
                  ? 'bg-[#FEE500] text-black'
                  : 'ml-auto bg-[#202020] text-[#EAEAEA]'
              }`}
            >
              {message}
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

export function Landing() {
  const [countdown, setCountdown] = useState(() => getCountdown(DEADLINE));

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCountdown(getCountdown(DEADLINE));
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  const scrollToApply = () => {
    document.getElementById('apply')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white selection:bg-[#D4AF37] selection:text-black">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(212,175,55,0.14),_transparent_25%),radial-gradient(circle_at_85%_12%,_rgba(245,230,179,0.08),_transparent_18%),linear-gradient(180deg,_#000_0%,_#040404_100%)]" />

      <header className="sticky top-0 z-50 border-b border-white/8 bg-black/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-3 sm:px-6 lg:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#D4AF37]/20 bg-[#111111] text-[#D4AF37]">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#D4AF37]">
                Charis Beauty
              </p>
              <p className="hidden text-sm text-white/65 sm:block">Lecture Conversion Landing</p>
            </div>
          </div>
          <CTAButton href={CTA_LINK} label="강의 신청하기" className="hidden sm:inline-flex" />
        </div>
      </header>

      <main className="pb-28 sm:pb-0">
        <section className="px-5 py-16 sm:px-6 sm:py-20 lg:px-6 lg:py-24">
          <div className="mx-auto grid max-w-[1280px] gap-6 lg:grid-cols-2 lg:items-center lg:gap-10">
            <Reveal>
              <Frame className="relative overflow-hidden border-[#D4AF37]/20 bg-[#090909] p-3 sm:p-4">
                <div className="absolute left-5 top-5 z-10 rounded-full border border-[#D4AF37]/20 bg-black/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#F5E6B3] backdrop-blur">
                  Charis Masterclass
                </div>
                <div className="absolute bottom-5 left-5 z-10 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/85 backdrop-blur">
                  사람이 먼저 믿음을 만듭니다
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                <img
                  src="/edu-hero-instructor.png"
                  alt="카리스뷰티 강사 이미지"
                  className="h-[27rem] w-full rounded-[1.7rem] object-cover object-top sm:h-[34rem] lg:h-[42rem]"
                />
              </Frame>
            </Reveal>

            <Reveal delay={0.08} className="max-w-[680px]">
              <SectionLabel>01. Hero</SectionLabel>
              <p className="mt-8 text-sm uppercase tracking-[0.32em] text-[#D4AF37]">Beauty Lecture Landing</p>
              <h1 className="mt-5 max-w-[620px] text-[2.55rem] font-semibold leading-[1.04] tracking-[-0.03em] text-white sm:text-[3.4rem] sm:leading-[1.08] lg:text-[4rem]">
                <span className="block">결과가 먼저 보이면</span>
                <span className="block">신청은 더</span>
                <span className="block text-[#F5E6B3]">빨라집니다</span>
              </h1>
              <p className="mt-6 max-w-[640px] text-base leading-[1.45] text-[#E5E5E5] sm:text-[17px]">
                기술이 좋은데도 강의 신청이 더딘 이유.
                고객이 사람과 결과를 먼저 못 보기 때문입니다.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <CTAButton href={CTA_LINK} label="지금 강의 신청하기" />
                <CTAButton href="#results" label="결과 먼저 보기" variant="secondary" />
              </div>
              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {[
                  ['강사 중심', '사람이 먼저 보이게'],
                  ['결과 중심', 'Before/After 먼저'],
                  ['신청 중심', 'CTA가 빨리 보이게'],
                ].map(([title, body]) => (
                  <div key={title} className="rounded-[1.4rem] border border-white/10 bg-[#111111] px-4 py-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-[#D4AF37]">{title}</p>
                    <p className="mt-2 text-sm leading-6 text-[#DCDCDC]">{body}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="results" className="px-5 py-16 sm:px-6 sm:py-20 lg:px-6 lg:py-24">
          <div className="mx-auto max-w-[1280px]">
            <Reveal>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <SectionLabel>02. Before / After</SectionLabel>
                  <h2 className="mt-5 max-w-[680px] text-[2.25rem] font-semibold leading-[1.18] text-white sm:text-[2.8rem] lg:text-[3.3rem]">
                    설명보다 먼저
                    <span className="block text-[#F5E6B3]">결과를 보여주세요</span>
                  </h2>
                </div>
                <p className="max-w-[620px] text-base leading-[1.45] text-[#CCCCCC] sm:text-[17px]">
                  강의를 신청하게 만드는 건 긴 설명이 아니라 먼저 보이는 결과입니다.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08} className="mt-10">
              <Frame className="overflow-hidden border-[#D4AF37]/20 bg-[#090909] p-4 sm:p-6 lg:p-7">
                <div className="grid gap-4 sm:gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-6">
                  <div className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#111111]">
                    <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.22em] text-white/45">Before</p>
                      <span className="rounded-full bg-white/6 px-3 py-1 text-xs uppercase tracking-[0.16em] text-white/70">
                        기존 결과
                      </span>
                    </div>
                    <img
                      src="/smp-b-a-1.png"
                      alt="시술 전후 예시 이미지 1"
                      className="aspect-[3/4] w-full object-cover sm:aspect-[4/5]"
                    />
                  </div>

                  <div className="flex items-center justify-center py-1 lg:py-0">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#D4AF37]/25 bg-[linear-gradient(135deg,_rgba(212,175,55,0.16),_rgba(245,230,179,0.08))] text-[#F5E6B3]">
                      <TrendingUp className="h-7 w-7" />
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-[1.8rem] border border-[#D4AF37]/20 bg-[#111111]">
                    <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.22em] text-[#D4AF37]">After</p>
                      <span className="rounded-full bg-[#D4AF37]/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-[#F5E6B3]">
                        강한 설득력
                      </span>
                    </div>
                    <img
                      src="/smp-b-a-2.png"
                      alt="시술 전후 예시 이미지 2"
                      className="aspect-[3/4] w-full object-cover sm:aspect-[4/5]"
                    />
                  </div>
                </div>

                <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-[#111111] px-5 py-5 sm:mt-6">
                  <p className="text-xs uppercase tracking-[0.24em] text-[#D4AF37]">핵심 포인트</p>
                  <p className="mt-3 text-2xl font-semibold leading-tight text-white sm:text-3xl">
                    결과를 먼저 보여주는 강의가
                    <span className="block text-[#F5E6B3]">더 빨리 신청됩니다</span>
                  </p>
                </div>
              </Frame>
            </Reveal>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-6 sm:py-20 lg:px-6 lg:py-24">
          <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <Reveal>
              <SectionLabel>03. 문제 공감</SectionLabel>
              <h2 className="mt-5 max-w-[680px] text-[2.9rem] font-semibold leading-[1.08] text-white sm:text-[3.4rem] lg:text-[4rem]">
                기술은 있는데
                <span className="block text-[#F5E6B3]">신청은 늘 제자리</span>
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="space-y-4">
                {problemPoints.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 rounded-[1.5rem] border border-white/10 bg-[#111111] px-5 py-5"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
                      <Target className="h-4 w-4" />
                    </div>
                    <p className="text-lg leading-7 text-white">{item}</p>
                  </div>
                ))}
                <p className="pt-2 text-base leading-7 text-[#CCCCCC]">
                  잘하는데도 신청이 느린 건 실력 부족이 아니라 보여주는 순서의 문제입니다.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-[#080808] px-5 py-16 sm:px-6 sm:py-20 lg:px-6 lg:py-24">
          <div className="mx-auto max-w-[1280px]">
            <Reveal>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <SectionLabel>04. 해결 구조</SectionLabel>
                  <h2 className="mt-5 max-w-[680px] text-[2.25rem] font-semibold leading-[1.18] text-white sm:text-[2.8rem] lg:text-[3.25rem]">
                    강의를 신청하게 만드는
                    <span className="block text-[#F5E6B3]">전환 구조</span>
                  </h2>
                </div>
                <p className="max-w-[620px] text-base leading-[1.45] text-[#CCCCCC] sm:text-[17px]">
                  사람이 먼저 보이고, 결과가 먼저 설득하고, CTA가 바로 보여야 합니다.
                </p>
              </div>
            </Reveal>

            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {solutionSteps.map((item, index) => (
                <Reveal key={item.step} delay={index * 0.06}>
                  <Frame
                    className={`h-full p-6 ${
                      index === 1 ? 'border-[#D4AF37]/25 bg-[linear-gradient(135deg,_rgba(212,175,55,0.12),_transparent_78%),#111111]' : 'bg-[#111111]'
                    }`}
                  >
                    <p className="text-xs uppercase tracking-[0.24em] text-[#D4AF37]">Step {item.step}</p>
                    <h3 className="mt-4 text-2xl font-semibold leading-tight text-white">{item.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-[#D8D8D8]">{item.text}</p>
                  </Frame>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-6 sm:py-20 lg:px-6 lg:py-24">
          <div className="mx-auto max-w-[1280px]">
            <Reveal>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <SectionLabel>05. 사례 / 후기</SectionLabel>
                  <h2 className="mt-5 max-w-[680px] text-[2.25rem] font-semibold leading-[1.18] text-white sm:text-[2.8rem] lg:text-[3.25rem]">
                    수강생이 직접 남긴
                    <span className="block text-[#F5E6B3]">카톡형 후기</span>
                  </h2>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-[#D4AF37]/20 bg-[#111111] px-4 py-3 text-sm text-[#F5E6B3]">
                  <Users className="h-4 w-4" />
                  수강생 결과 중심
                </div>
              </div>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
              {reviews.map((review, index) => (
                <Reveal key={review.persona} delay={index * 0.06}>
                  <KakaoReview {...review} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#080808] px-5 py-16 sm:px-6 sm:py-20 lg:px-6 lg:py-24">
          <div className="mx-auto grid max-w-[1280px] gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <Reveal>
              <SectionLabel>06. 커리큘럼</SectionLabel>
              <h2 className="mt-5 max-w-[680px] text-[2.25rem] font-semibold leading-[1.18] text-white sm:text-[2.8rem] lg:text-[3.25rem]">
                듣고 끝나는 강의가 아니라
                <span className="block text-[#F5E6B3]">바로 적용하는 강의</span>
              </h2>
              <p className="mt-6 max-w-[620px] text-base leading-[1.45] text-[#CCCCCC] sm:text-[17px]">
                긴 설명보다 실전 적용에 필요한 것만 정리했습니다.
              </p>
              <div className="mt-8">
                <CTAButton href={CTA_LINK} label="커리큘럼 보고 신청하기" />
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <Frame className="overflow-hidden p-4 sm:p-6">
                <div className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
                  <div className="overflow-hidden rounded-[1.8rem] border border-white/10">
                    <img
                      src="/course-hero.png"
                      alt="강의 대표 이미지"
                      className="h-full min-h-[18rem] w-full object-cover"
                    />
                  </div>
                  <div className="space-y-3">
                    {curriculum.map((item, index) => (
                      <div
                        key={item}
                        className="flex items-start gap-4 rounded-[1.3rem] border border-white/10 bg-[#111111] px-4 py-4"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/20 bg-black text-sm font-semibold text-[#F5E6B3]">
                          {index + 1}
                        </div>
                        <p className="text-sm leading-7 text-[#E6E6E6]">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Frame>
            </Reveal>
          </div>
        </section>

        <section id="apply" className="px-5 py-16 sm:px-6 sm:py-20 lg:px-6 lg:py-24">
          <div className="mx-auto max-w-[1280px]">
            <Reveal>
              <Frame className="overflow-hidden border-[#D4AF37]/20 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.18),_transparent_34%),linear-gradient(135deg,_#171717_0%,_#080808_55%,_#050505_100%)] p-6 sm:p-8 lg:p-12">
                <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                  <div>
                    <SectionLabel>07. CTA</SectionLabel>
                    <h2 className="mt-5 max-w-[680px] text-[3rem] font-semibold leading-[1.08] text-white sm:text-[3.5rem] lg:text-[4rem]">
                      강의는
                      <span className="block text-[#F5E6B3]">신청하게 만들어야</span>
                      <span className="block">의미가 있습니다</span>
                    </h2>
                    <p className="mt-6 max-w-[640px] text-base leading-[1.45] text-[#CCCCCC] sm:text-[17px]">
                      결과, 사람, 후기, 커리큘럼까지 모두 본 지금.
                      남은 건 신청 버튼을 누르는 일입니다.
                    </p>
                    <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                      <CTAButton href={CTA_LINK} label="지금 강의 신청하기" />
                      <CTAButton href="#results" label="결과 다시 보기" variant="secondary" />
                    </div>
                  </div>

                  <div className="grid gap-5">
                    <Frame className="border-[#D4AF37]/20 bg-black/25 p-5">
                      <div className="flex flex-wrap gap-3">
                        <div className="inline-flex items-center rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#F5E6B3]">
                          이번 기수 마감 임박
                        </div>
                        <div className="inline-flex items-center rounded-full border border-white/10 bg-[#121212] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
                          선착순 신청 마감
                        </div>
                      </div>

                      <div className="mt-5 grid grid-cols-4 gap-3">
                        {countdown.map((item) => (
                          <div
                            key={item.label}
                            className="rounded-[1.1rem] border border-white/10 bg-[#111111] px-3 py-4 text-center"
                          >
                            <div className="text-2xl font-semibold text-white">{item.value}</div>
                            <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]">
                              {item.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </Frame>

                    <div className="grid gap-3">
                      {[
                        '강사 중심 Hero',
                        '결과 중심 Before/After',
                        '카톡형 후기 강조',
                        '짧은 메시지 중심 구조',
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-3 rounded-[1.2rem] border border-white/10 bg-[#111111] px-4 py-4"
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D4AF37]/10 text-[#D4AF37]">
                            <Check className="h-4 w-4" />
                          </div>
                          <p className="text-sm leading-6 text-[#E7E7E7]">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Frame>
            </Reveal>
          </div>
        </section>
      </main>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] px-5 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-4 sm:hidden">
        <div className="mx-auto max-w-md rounded-[1.5rem] border border-[#D4AF37]/15 bg-black/75 p-2 shadow-[0_-10px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          <button
            type="button"
            onClick={scrollToApply}
            className="pointer-events-auto flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F5E6B3] to-[#C9A227] px-5 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-black transition-transform duration-300 active:scale-[0.98]"
          >
            <span>강의 신청하기</span>
          </button>
        </div>
      </div>
    </div>
  );
}
