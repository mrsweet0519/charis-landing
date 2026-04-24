import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import {
  AlarmClock,
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  Brain,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  Gem,
  Hand,
  HeartHandshake,
  MessageCircleMore,
  Play,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react';

import { CTAButton } from '../components/landing/CTAButton';
import {
  CapturePlaceholder,
  PhotoWallPlaceholder,
  SplitVisualPlaceholder,
  VideoSlotPlaceholder,
} from '../components/landing/MediaPlaceholders';
import { Reveal } from '../components/landing/Reveal';

const WEBINAR_CTA = '#webinar';
const FINAL_CTA = '#final-cta';
const DEADLINE = new Date('2026-05-10T23:59:59+09:00').getTime();

const empathyChecklist = [
  '시술도 내가',
  '상담도 내가',
  'CS도 내가',
  '세금도 내가',
  '광고도 내가',
  '고객 설득도 내가',
  '아이 케어까지 내가',
];

const structurePillars = [
  {
    icon: Gem,
    title: '기술',
    text: '결이 보이는 시술 퀄리티',
  },
  {
    icon: BriefcaseBusiness,
    title: '경영',
    text: '대표가 버티지 않는 운영 기준',
  },
  {
    icon: HeartHandshake,
    title: 'CS',
    text: '상담과 재방문을 만드는 응대 구조',
  },
  {
    icon: CircleDollarSign,
    title: '세금',
    text: '1인샵 대표가 알아야 할 돈 관리 감각',
  },
  {
    icon: Brain,
    title: '워킹맘 마인드',
    text: '지치지 않고 오래 가는 기준과 루틴',
  },
];

const resultCategories = [
  '숱채움',
  '무삭발 전체커버',
  '흉터커버',
  '헤어라인',
  '가마',
];

const technicalCurriculum = [
  'D, L 차이',
  '색소, 니들',
  '파지',
  '고무판',
  '마네킹',
  '임상',
  'AB 사진 콘텐츠 제공',
];

const businessCurriculum = [
  '경영철학',
  '자본주의',
  '마케팅',
  '상담 + CRM',
  '카톡채널 유입',
  '플레이스 운영',
  '마케팅 SaaS 프로그램 세팅',
];

const mindsetPoints = [
  '시간 관리',
  '감정 소진 줄이기',
  '아이와 일 사이에서 무너지지 않는 기준',
  '오래 가는 운영 루틴',
];

const webinarFlow = [
  '내 위치 진단',
  '왜 기술만으로는 안 되는가',
  '결로 고단가 만드는 구조',
  '경영 커리큘럼 소개',
];

const reviewCards = [
  {
    name: '수강생 A',
    tag: '아이 키우는 원장',
    summary: '아이 재우고도 문의 관리가 가능해졌어요.',
    quote:
      '예전엔 시술 끝나면 상담과 CS가 더 힘들었는데, 지금은 흐름이 생겨서 하루가 덜 무너져요.',
  },
  {
    name: '수강생 B',
    tag: '매출 정체 원장',
    summary: '광고비만 쓰던 구조에서 벗어났어요.',
    quote:
      '기술이 부족한 줄 알았는데, 상담 구조를 바꾸고 나서야 예약 전환이 달라졌어요.',
  },
  {
    name: '수강생 C',
    tag: '지방 1인샵 대표',
    summary: '혼자 버티는 느낌이 줄었습니다.',
    quote:
      '결국 중요한 건 더 열심히 하는 게 아니라, 고객이 이해하고 움직이게 만드는 구조였어요.',
  },
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

function ReviewBubbleCard({
  name,
  tag,
  summary,
  quote,
}: {
  name: string;
  tag: string;
  summary: string;
  quote: string;
}) {
  return (
    <DarkPanel className="bg-[#101010] p-4">
      <div className="rounded-[1.4rem] border border-[#2A2A2A] bg-[#FEE500] p-3 text-black">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold">{name}</p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-black/65">
              {tag}
            </p>
          </div>
          <div className="rounded-full bg-black px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#FEE500]">
            Kakao Style
          </div>
        </div>
      </div>

      <div className="mt-3 space-y-3">
        <div className="max-w-[88%] rounded-[1.2rem] rounded-tl-sm bg-[#1B1B1B] px-4 py-3 text-sm leading-6 text-white/88">
          {summary}
        </div>
        <div className="ml-auto max-w-[92%] rounded-[1.2rem] rounded-tr-sm bg-[#D4AF37] px-4 py-3 text-sm leading-6 text-black">
          {quote}
        </div>
      </div>
    </DarkPanel>
  );
}

function ResultCard({
  title,
  text,
  index,
  kind,
}: {
  title: string;
  text: string;
  index: number;
  kind: 'image' | 'placeholder';
}) {
  return (
    <Reveal delay={index * 0.04}>
      <DarkPanel className="overflow-hidden bg-[#111111] p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
              Result {String(index + 1).padStart(2, '0')}
            </p>
            <h3 className="mt-2 text-[1.45rem] font-semibold text-white">{title}</h3>
          </div>
          <div className="rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#F5E6B3]">
            {kind === 'image' ? 'Hero Result' : 'Replace Slot'}
          </div>
        </div>

        <p className="mt-3 text-sm leading-6 text-white/68">{text}</p>

        <div
          className={`mt-4 overflow-hidden rounded-[1.35rem] border ${
            kind === 'image'
              ? 'border-[#D4AF37]/20 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.22),_transparent_42%),linear-gradient(135deg,_#171717_0%,_#0E0E0E_100%)]'
              : 'border-white/10 bg-[#171717]'
          }`}
        >
          {kind === 'image' ? (
            <div className="grid grid-cols-2 gap-px bg-black/30">
              <div className="flex aspect-[4/5] flex-col items-center justify-center bg-[#1B1B1B] p-4 text-center">
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
                  Before
                </span>
                <div className="mt-3 h-20 w-20 rounded-full border border-dashed border-white/12 bg-[#242424]" />
              </div>
              <div className="flex aspect-[4/5] flex-col items-center justify-center bg-[#131313] p-4 text-center">
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
                  After
                </span>
                <div className="mt-3 h-20 w-20 rounded-full border border-dashed border-[#D4AF37]/24 bg-[#211A08]" />
              </div>
            </div>
          ) : (
            <div className="flex aspect-[4/5] items-center justify-center px-6 text-center text-sm leading-7 text-white/45">
              실제 Before / After 결과 이미지 또는 짧은 영상 교체 영역
            </div>
          )}
        </div>
      </DarkPanel>
    </Reveal>
  );
}

function Wrap({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[620px] ${className}`.trim()}>{children}</div>;
}

function Block({
  children,
  className = '',
  tone = 'dark',
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: 'dark' | 'cream';
  id?: string;
}) {
  const toneClass = tone === 'cream' ? 'bg-[#F5EDDC] text-[#111111]' : 'bg-transparent text-white';

  return (
    <section id={id} className={`px-4 py-7 sm:px-5 sm:py-9 ${toneClass} ${className}`.trim()}>
      <Wrap>{children}</Wrap>
    </section>
  );
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] ${
        light
          ? 'border-black/10 bg-white text-[#8A6910]'
          : 'border-[#D4AF37]/20 bg-[#101010] text-[#F5E6B3]'
      }`}
    >
      <BadgeCheck className={`h-3.5 w-3.5 ${light ? 'text-[#C89C24]' : 'text-[#D4AF37]'}`} />
      <span>{children}</span>
    </div>
  );
}

function DarkPanel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5 shadow-[0_20px_45px_rgba(0,0,0,0.24)] ${className}`.trim()}
    >
      {children}
    </div>
  );
}

function LightPanel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-[1.6rem] border border-black/8 bg-white/85 p-5 shadow-[0_14px_28px_rgba(0,0,0,0.08)] ${className}`.trim()}
    >
      {children}
    </div>
  );
}

function Bubble({
  children,
  tone = 'dark',
  className = '',
}: {
  children: ReactNode;
  tone?: 'dark' | 'gold' | 'light';
  className?: string;
}) {
  const toneClass =
    tone === 'gold'
      ? 'border-[#D4AF37]/20 bg-[#D4AF37] text-black'
      : tone === 'light'
        ? 'border-black/10 bg-white text-[#111111]'
        : 'border-white/10 bg-[#111111] text-white';

  return <div className={`rounded-[1.2rem] border px-4 py-3 text-sm leading-6 ${toneClass} ${className}`.trim()}>{children}</div>;
}

function StopScreen({
  lines,
  subtitle,
  tone = 'dark',
}: {
  lines: string[];
  subtitle?: string;
  tone?: 'dark' | 'cream';
}) {
  const light = tone === 'cream';

  return (
    <Block tone={tone}>
      <Reveal>
        <div
          className={`rounded-[2rem] border p-6 sm:p-7 ${
            light
              ? 'border-black/10 bg-white/70 text-[#111111]'
              : 'border-[#D4AF37]/18 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.16),_transparent_36%),#0E0E0E] text-white'
          }`}
        >
          <div className="space-y-1">
            {lines.map((line, index) => (
              <p
                key={line}
                className={`text-[2.45rem] font-semibold leading-[0.98] tracking-[-0.05em] sm:text-[3.15rem] ${
                  index === lines.length - 1 ? (light ? 'text-[#8A6910]' : 'text-[#F5E6B3]') : ''
                }`}
              >
                {line}
              </p>
            ))}
          </div>
          {subtitle ? (
            <p className={`mt-4 text-base leading-7 ${light ? 'text-[#463F33]' : 'text-white/65'}`}>{subtitle}</p>
          ) : null}
        </div>
      </Reveal>
    </Block>
  );
}

function StrongCTA({ label = '무료 웨비나 신청하기', href = WEBINAR_CTA }: { label?: string; href?: string }) {
  return <CTAButton href={href} label={label} className="min-h-14 w-full justify-center px-8 text-[15px]" />;
}

export function Landing() {
  const [countdown, setCountdown] = useState(() => getCountdown(DEADLINE));

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCountdown(getCountdown(DEADLINE));
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  const scrollToWebinar = () => {
    document.getElementById('webinar')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white selection:bg-[#D4AF37] selection:text-black">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(212,175,55,0.18),_transparent_20%),radial-gradient(circle_at_84%_12%,_rgba(245,230,179,0.08),_transparent_14%),linear-gradient(180deg,_#000_0%,_#050505_100%)]" />

      <header className="sticky top-0 z-50 border-b border-white/8 bg-black/82 backdrop-blur-xl">
        <Wrap className="flex items-center justify-between px-4 py-3 sm:px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#D4AF37]/20 bg-[#111111] text-[#D4AF37]">
              <Sparkles className="h-5 w-5" />
            </div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#D4AF37]">Charis Beauty</p>
          </div>
          <div className="hidden sm:block">
            <CTAButton href={WEBINAR_CTA} label="무료 웨비나 신청하기" />
          </div>
        </Wrap>
      </header>

      <main className="pb-28 sm:pb-0">
        <Block>
          <Reveal>
            <DarkPanel className="bg-[#0E0E0E]">
              <Eyebrow>01. Hero</Eyebrow>
              <h1 className="mt-5 text-[2.65rem] font-semibold leading-[0.96] tracking-[-0.05em] text-white sm:text-[3.35rem]">
                기술만 배우면 될 줄 알았던
                <span className="block text-[#F5E6B3]">1인샵 워킹맘 대표님께</span>
              </h1>

              <Bubble tone="gold" className="mt-4 font-semibold">
                스트레스 받는 1인샵 대표 → 효율적인 운영 → 여유 있는 워킹맘 대표
              </Bubble>

              <div className="mt-5 space-y-3">
                <DarkPanel className="bg-[#131313] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D4AF37]/10 text-[#F5E6B3]">
                      <AlarmClock className="h-4 w-4" />
                    </div>
                    <div className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">
                      stress
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {['바쁨', '돈 안됨', '육아 병행', '멘탈 붕괴'].map((item) => (
                      <Bubble key={item} className="py-2 text-xs">
                        {item}
                      </Bubble>
                    ))}
                  </div>
                  <p className="mt-4 text-[1.7rem] font-semibold leading-[1.06] text-white">스트레스 받는 1인샵 대표</p>
                </DarkPanel>

                <div className="flex justify-center text-[#D4AF37]">
                  <ArrowDown className="h-5 w-5" />
                </div>

                <DarkPanel className="border-[#D4AF37]/18 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.16),_transparent_30%),#121212] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D4AF37]/10 text-[#F5E6B3]">
                      <Workflow className="h-4 w-4" />
                    </div>
                    <div className="rounded-full bg-[#D4AF37] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-black">
                      system
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {['예약 흐름', '상담 구조', 'CS 기준', '운영 기준'].map((item) => (
                      <Bubble key={item} className="py-2 text-xs">
                        {item}
                      </Bubble>
                    ))}
                  </div>
                  <p className="mt-4 text-[1.7rem] font-semibold leading-[1.06] text-white">효율적인 운영</p>
                </DarkPanel>

                <div className="flex justify-center text-[#D4AF37]">
                  <ArrowDown className="h-5 w-5" />
                </div>

                <DarkPanel className="bg-[#131313] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D4AF37]/10 text-[#F5E6B3]">
                      <HeartHandshake className="h-4 w-4" />
                    </div>
                    <div className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">
                      balance
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {['불안 → 안정', '노동 → 시스템', '버팀 → 운영'].map((item) => (
                      <Bubble key={item} className="py-2 text-xs">
                        {item}
                      </Bubble>
                    ))}
                  </div>
                  <p className="mt-4 text-[1.7rem] font-semibold leading-[1.06] text-white">여유 있는 워킹맘 대표</p>
                </DarkPanel>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <StrongCTA />
                <Bubble className="font-medium">
                  결, 세금, CS, 상담, 브랜딩, 워킹맘 마인드셋까지. 혼자 버티는 원장이 아니라 시스템으로 운영하는 대표가 되는 법.
                </Bubble>
              </div>
            </DarkPanel>
          </Reveal>
        </Block>

        <StopScreen
          lines={['이건 실력 문제가 아닙니다.', '혼자 버티는 구조의 문제입니다.']}
          subtitle="여기서 사용자가 스크롤을 멈추고, 내 문제를 다시 보게 만들어야 합니다."
        />

        <Block tone="cream">
          <Reveal>
            <Eyebrow light>03. 내 스토리</Eyebrow>
            <h2 className="mt-5 text-[2.45rem] font-semibold leading-[0.98] tracking-[-0.05em] sm:text-[3.05rem]">
              저도 처음엔
              <span className="block text-[#8A6910]">기술이면 되는 줄 알았습니다.</span>
            </h2>
          </Reveal>

          <div className="mt-5 space-y-3">
            {storyLines.map((line, index) => (
              <Reveal key={line} delay={index * 0.04}>
                <LightPanel>
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black text-white">
                      <span className="text-[11px] font-semibold">{index + 1}</span>
                    </div>
                    <Bubble tone="light" className="flex-1 border-black/10 bg-[#F8F2E6] text-base">
                      {line}
                    </Bubble>
                  </div>
                </LightPanel>
              </Reveal>
            ))}
          </div>
        </Block>

        <Block>
          <Reveal>
            <Eyebrow>04. 변화</Eyebrow>
            <h2 className="mt-5 text-[2.4rem] font-semibold leading-[0.98] tracking-[-0.05em] text-white sm:text-[3rem]">
              바쁜 대표에서
              <span className="block text-[#F5E6B3]">구조 가진 대표로</span>
            </h2>
          </Reveal>

          <div className="mt-5 space-y-3">
            {[
              ['Before', '불안', 'After', '안정'],
              ['Before', '노동', 'After', '시스템'],
              ['Before', '설명', 'After', '이해되는 구조'],
            ].map(([leftTag, left, rightTag, right]) => (
              <Reveal key={left + right}>
                <DarkPanel className="bg-[#101010]">
                  <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                    <div className="rounded-[1rem] border border-white/10 bg-[#151515] px-4 py-4 text-center">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">{leftTag}</p>
                      <p className="mt-2 text-[1.25rem] font-semibold text-white">{left}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-[#D4AF37]" />
                    <div className="rounded-[1rem] border border-[#D4AF37]/18 bg-[#D4AF37]/10 px-4 py-4 text-center">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#F5E6B3]">{rightTag}</p>
                      <p className="mt-2 text-[1.25rem] font-semibold text-white">{right}</p>
                    </div>
                  </div>
                </DarkPanel>
              </Reveal>
            ))}
          </div>
        </Block>

        <StopScreen
          lines={['지금 방식 계속하면', '결과 안 바뀝니다.']}
          tone="cream"
          subtitle="잘하는데 안 되는 이유는 결국 구조이기 때문입니다."
        />

        <Block>
          <Reveal>
            <Eyebrow>06. 해결 구조</Eyebrow>
            <h2 className="mt-5 text-[2.4rem] font-semibold leading-[0.98] tracking-[-0.05em] text-white sm:text-[3rem]">
              기술 + 경영 + CS + 세금 + 워킹맘 마인드
              <span className="block text-[#F5E6B3]">이 5개를 한 번에 정리합니다.</span>
            </h2>
          </Reveal>

          <div className="mt-5 space-y-3">
            {structurePillars.map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal key={item.title} delay={index * 0.04}>
                  <DarkPanel className={index === 0 ? 'border-[#D4AF37]/20 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.16),_transparent_34%),#111111]' : 'bg-[#111111]'}>
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D4AF37]/10 text-[#F5E6B3]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[1.4rem] font-semibold text-white">{item.title}</p>
                        <p className="mt-2 text-sm leading-7 text-white/68">{item.text}</p>
                      </div>
                    </div>
                  </DarkPanel>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.06}>
            <div className="mt-5">
              <StrongCTA label="지금 무료 신청하기" />
            </div>
          </Reveal>
        </Block>

        <Block>
          <Reveal>
            <Eyebrow>07. 점 VS 결</Eyebrow>
            <h2 className="mt-5 text-[2.35rem] font-semibold leading-[0.98] tracking-[-0.05em] text-white sm:text-[2.95rem]">
              점으로 찍는 시술과
              <span className="block text-[#F5E6B3]">결로 보이는 시술은 다릅니다.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.04} className="mt-5">
            <SplitVisualPlaceholder
              title="점 VS 결 비교 이미지"
              description="비교 이미지, 타이트샷, 결과 이미지를 나중에 쉽게 교체할 수 있게 구성했습니다."
            />
          </Reveal>

          <div className="mt-5 space-y-3">
            <Reveal>
              <DarkPanel>
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                  <ScanLine className="h-3.5 w-3.5" />
                  타이트샷
                </div>
                <div className="mt-3 flex aspect-[4/3] items-center justify-center rounded-[1.2rem] border border-dashed border-white/12 bg-[#181818] text-center text-sm leading-7 text-white/50">
                  타이트샷 이미지 교체 영역
                </div>
              </DarkPanel>
            </Reveal>

            <Reveal delay={0.05}>
              <DarkPanel>
                <div className="space-y-2">
                  {[
                    ['보이는 인상', '점감', '결감'],
                    ['고객 이해도', '설명 필요', '바로 이해'],
                    ['상담 전환', '가격 질문', '결과 질문'],
                  ].map(([label, left, right]) => (
                    <div key={label} className="grid grid-cols-[0.8fr_1fr_1fr] gap-2 rounded-[1rem] bg-[#121212] px-3 py-3 text-sm">
                      <span className="text-white/40">{label}</span>
                      <span className="text-white/68">{left}</span>
                      <span className="font-semibold text-[#F5E6B3]">{right}</span>
                    </div>
                  ))}
                </div>
              </DarkPanel>
            </Reveal>
          </div>
        </Block>

        <Block className="bg-[#090909]">
          <Reveal>
            <Eyebrow>08. 결과</Eyebrow>
            <h2 className="mt-5 text-[2.35rem] font-semibold leading-[0.98] tracking-[-0.05em] text-white sm:text-[2.95rem]">
              고객은 설명보다
              <span className="block text-[#F5E6B3]">결과를 먼저 봅니다.</span>
            </h2>
          </Reveal>

          <div className="mt-5 space-y-3">
            {resultCategories.map((title, index) => (
              <ResultCard
                key={title}
                title={title}
                text={
                  index === 0
                    ? '결과가 먼저 보이면 상담의 톤이 달라집니다.'
                    : '설명보다 먼저 이해되는 결과 구조가 필요합니다.'
                }
                index={index}
                kind={index === 0 ? 'image' : 'placeholder'}
              />
            ))}
          </div>
        </Block>

        <Block>
          <Reveal>
            <Eyebrow>09. 영상</Eyebrow>
            <h2 className="mt-5 text-[2.35rem] font-semibold leading-[0.98] tracking-[-0.05em] text-white sm:text-[2.95rem]">
              짧은 영상 하나가
              <span className="block text-[#F5E6B3]">상담 시간을 줄입니다.</span>
            </h2>
          </Reveal>

          <div className="mt-5 space-y-3">
            {[
              ['가마 라인 영상', '짧은 시연 영상 교체 영역'],
              ['흉터 라인 영상', '짧은 시연 영상 교체 영역'],
              ['헤어라인 영상', '짧은 시연 영상 교체 영역'],
            ].map(([title, description], index) => (
              <Reveal key={title} delay={index * 0.04}>
                <VideoSlotPlaceholder title={title} description={description} />
              </Reveal>
            ))}
          </div>
        </Block>

        <StopScreen
          lines={['고객이 이해하지 못하면', '신청하지 않습니다.']}
          subtitle="사용자가 읽는 페이지가 아니라, 이해하면서 다음으로 넘어가는 페이지여야 합니다."
        />

        <Block>
          <Reveal>
            <Eyebrow>11. 해결 구조</Eyebrow>
            <h2 className="mt-5 text-[2.35rem] font-semibold leading-[0.98] tracking-[-0.05em] text-white sm:text-[2.95rem]">
              이제는 기술자가 아니라
              <span className="block text-[#F5E6B3]">대표로 배워야 합니다.</span>
            </h2>
          </Reveal>

          <div className="mt-5 space-y-3">
            {[
              {
                icon: <Gem className="h-4 w-4" />,
                title: '1단계 결이 보이는 기술',
                text: '고객이 한눈에 이해하는 결과 표현을 만듭니다.',
              },
              {
                icon: <MessageCircleMore className="h-4 w-4" />,
                title: '2단계 상담과 CS 구조',
                text: '문의가 신청으로 이어지는 응대 흐름을 만듭니다.',
              },
              {
                icon: <Workflow className="h-4 w-4" />,
                title: '3단계 브랜딩과 운영 시스템',
                text: '혼자 버티지 않아도 되는 대표의 구조를 만듭니다.',
              },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 0.04}>
                <DarkPanel className={index === 1 ? 'border-[#D4AF37]/20 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.14),_transparent_34%),#111111]' : 'bg-[#111111]'}>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D4AF37]/10 text-[#F5E6B3]">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-[1.35rem] font-semibold text-white">{item.title}</p>
                      <p className="mt-2 text-sm leading-7 text-white/68">{item.text}</p>
                    </div>
                  </div>
                </DarkPanel>
              </Reveal>
            ))}
          </div>
        </Block>

        <Block tone="cream">
          <Reveal>
            <Eyebrow light>12. 기술 커리큘럼</Eyebrow>
            <h2 className="mt-5 text-[2.25rem] font-semibold leading-[0.98] tracking-[-0.05em] sm:text-[2.85rem]">
              기술도
              <span className="block text-[#8A6910]">결과 중심으로 다시 배웁니다.</span>
            </h2>
          </Reveal>

          <div className="mt-5 grid gap-3">
            {technicalCurriculum.map((item, index) => (
              <Reveal key={item} delay={index * 0.03}>
                <LightPanel className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-[#C89C24]" />
                  <p className="text-base text-[#2E2820]">{item}</p>
                </LightPanel>
              </Reveal>
            ))}
          </div>
        </Block>

        <Block>
          <Reveal>
            <Eyebrow>13. 경영 커리큘럼</Eyebrow>
            <h2 className="mt-5 text-[2.25rem] font-semibold leading-[0.98] tracking-[-0.05em] text-white sm:text-[2.85rem]">
              두피문신도
              <span className="block text-[#F5E6B3]">경영으로 배워야 오래 갑니다.</span>
            </h2>
          </Reveal>

          <div className="mt-5 grid gap-3">
            {businessCurriculum.map((item, index) => (
              <Reveal key={item} delay={index * 0.03}>
                <DarkPanel className="bg-[#101010]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D4AF37]/10 text-xs font-semibold text-[#F5E6B3]">
                      {index + 1}
                    </div>
                    <p className="text-base text-white">{item}</p>
                  </div>
                </DarkPanel>
              </Reveal>
            ))}
          </div>
        </Block>

        <Block tone="cream">
          <Reveal>
            <Eyebrow light>14. 워킹맘 마인드셋</Eyebrow>
            <h2 className="mt-5 text-[2.25rem] font-semibold leading-[0.98] tracking-[-0.05em] sm:text-[2.85rem]">
              일도 아이도
              <span className="block text-[#8A6910]">놓치고 싶지 않은 대표님께</span>
            </h2>
          </Reveal>

          <div className="mt-5 space-y-3">
            {mindsetPoints.map((item, index) => (
              <Reveal key={item} delay={index * 0.03}>
                <LightPanel className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
                    <Clock3 className="h-4 w-4" />
                  </div>
                  <Bubble tone="light" className="flex-1 border-black/10 bg-[#F8F1E5] text-base">
                    {item}
                  </Bubble>
                </LightPanel>
              </Reveal>
            ))}
          </div>
        </Block>

        <StopScreen
          lines={['혼자 잘하는 사람보다,', '구조를 가진 사람이 오래 갑니다.']}
          tone="cream"
        />

        <Block>
          <Reveal>
            <Eyebrow>15. 후기 / 증거</Eyebrow>
            <h2 className="mt-5 text-[2.25rem] font-semibold leading-[0.98] tracking-[-0.05em] text-white sm:text-[2.85rem]">
              카톡형 후기와 증거는
              <span className="block text-[#F5E6B3]">신뢰를 빠르게 만듭니다.</span>
            </h2>
          </Reveal>

          <div className="mt-5 space-y-3">
            {reviewCards.map((item, index) => (
              <Reveal key={item.name} delay={index * 0.04}>
                <ReviewBubbleCard {...item} />
              </Reveal>
            ))}
          </div>

          <div className="mt-5 space-y-3">
            <Reveal>
              <CapturePlaceholder title="카톡 캡처 스타일" description="실제 문의와 상담 흐름을 보여주는 구간입니다." />
            </Reveal>
            <Reveal delay={0.04}>
              <CapturePlaceholder title="지방 문의 / 캐나다 문의" description="지역을 넘어 문의가 들어온다는 증거 구간입니다." />
            </Reveal>
            <Reveal delay={0.08}>
              <CapturePlaceholder title="매출 인증 placeholder" description="실제 숫자 자료로 교체 가능한 영역입니다." />
            </Reveal>
            <Reveal delay={0.12}>
              <PhotoWallPlaceholder title="강의 현장 사진 8장 placeholder" description="현장감과 신뢰감을 함께 보여주는 사진 벽입니다." />
            </Reveal>
          </div>
        </Block>

        <Block id="webinar" className="bg-[#090909]">
          <Reveal>
            <Eyebrow>16. 무료 웨비나 구성</Eyebrow>
            <h2 className="mt-5 text-[2.25rem] font-semibold leading-[0.98] tracking-[-0.05em] text-white sm:text-[2.85rem]">
              무료 웨비나 한 번으로
              <span className="block text-[#F5E6B3]">내 위치와 다음 단계가 선명해집니다.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.04} className="mt-5">
            <DarkPanel className="border-[#D4AF37]/20 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.18),_transparent_34%),linear-gradient(135deg,_#171717_0%,_#0A0A0A_60%,_#050505_100%)]">
              <div className="flex flex-wrap gap-2">
                <Bubble tone="gold" className="py-2 text-[11px] font-semibold uppercase tracking-[0.2em]">
                  선착순 50명
                </Bubble>
                <Bubble className="py-2 text-[11px] font-semibold uppercase tracking-[0.2em]">
                  이번 기수 마감 임박
                </Bubble>
              </div>

              <div className="mt-5 grid grid-cols-4 gap-2">
                {countdown.map((item) => (
                  <div key={item.label} className="rounded-[1rem] border border-white/10 bg-[#111111] px-3 py-4 text-center">
                    <div className="text-2xl font-semibold text-white">{item.value}</div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-[#D4AF37]">{item.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-5 space-y-2">
                {webinarFlow.map((item, index) => (
                  <div key={item} className="flex items-start gap-3 rounded-[1rem] border border-white/8 bg-[#151515] px-4 py-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D4AF37] text-xs font-semibold text-black">
                      {index + 1}
                    </div>
                    <p className="pt-0.5 text-sm leading-7 text-white/76">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-col gap-3">
                <StrongCTA />
                <Bubble className="font-medium">
                  지금 신청해야 하는 이유: 대표의 시간과 에너지가 더 늦기 전에 구조를 바꿔야 하기 때문입니다.
                </Bubble>
              </div>
            </DarkPanel>
          </Reveal>
        </Block>

        <Block id="final-cta">
          <Reveal>
            <DarkPanel className="border-[#D4AF37]/24 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.22),_transparent_34%),linear-gradient(135deg,_#171717_0%,_#090909_62%,_#050505_100%)] p-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-black">
                <ShieldCheck className="h-3.5 w-3.5" />
                최종 CTA
              </div>
              <h2 className="mt-5 text-[2.45rem] font-semibold leading-[0.96] tracking-[-0.05em] text-white sm:text-[3rem]">
                혼자 버티는 원장에서
                <span className="block text-[#F5E6B3]">시스템으로 운영하는 대표로 넘어가세요.</span>
              </h2>
              <Bubble className="mt-4 font-medium">
                이제는 기술자가 아니라 대표로 배워야 합니다.
              </Bubble>
              <div className="mt-5 flex flex-col gap-3">
                <StrongCTA href={FINAL_CTA} label="무료 웨비나 신청하기" />
                <Bubble className="text-sm">기술만으로는 부족합니다. 구조를 가진 사람이 오래 갑니다.</Bubble>
              </div>
            </DarkPanel>
          </Reveal>
        </Block>
      </main>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-4 sm:hidden">
        <div className="mx-auto w-full max-w-[620px] rounded-[1.4rem] border border-[#D4AF37]/15 bg-black/82 p-2 shadow-[0_-10px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          <button
            type="button"
            onClick={scrollToWebinar}
            className="pointer-events-auto flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F5E6B3] to-[#C9A227] px-5 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-black transition-transform duration-300 active:scale-[0.98]"
          >
            <span>무료 웨비나 신청하기</span>
          </button>
        </div>
      </div>
    </div>
  );
}
