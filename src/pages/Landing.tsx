import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import {
  AlarmClock,
  ArrowRight,
  BadgeCheck,
  Brain,
  BriefcaseBusiness,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  Gem,
  HeartHandshake,
  MessageCircleMore,
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
  '✔ 시술도 내가',
  '✔ 상담도 내가',
  '✔ CS도 내가',
  '✔ 세금도 내가',
  '✔ 광고도 내가',
  '✔ 아이 케어까지 내가',
];

const structurePillars = [
  {
    icon: Gem,
    title: '기술',
    text: '💡 고객이 바로\n납득하는 결과',
  },
  {
    icon: BriefcaseBusiness,
    title: '경영',
    text: '💡 버티는 운영 말고\n무너지지 않는 운영',
  },
  {
    icon: HeartHandshake,
    title: 'CS',
    text: '💡 친절한 응대 말고\n다시 오게 만드는 흐름',
  },
  {
    icon: CircleDollarSign,
    title: '세금',
    text: '💡 몰라서 새는 돈\n먼저 막는 감각',
  },
  {
    icon: Brain,
    title: '워킹맘 마인드',
    text: '💡 무너지지 않고\n오래 가는 루틴',
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
  '✔ D, L 차이',
  '✔ 색소, 니들',
  '✔ 파지',
  '✔ 고무판',
  '✔ 마네킹',
  '✔ 임상',
  '✔ AB 사진',
];

const businessCurriculum = [
  '✔ 경영철학',
  '✔ 자본주의',
  '✔ 마케팅',
  '✔ 상담 + CRM',
  '✔ 카톡채널 유입',
  '✔ 플레이스 운영',
  '✔ SaaS 세팅',
];

const mindsetPoints = [
  '💡 시간 관리',
  '💡 감정 소진 줄이기',
  '💡 일과 아이 사이 기준 세우기',
  '💡 오래 가는 운영 루틴',
];

const webinarFlow = [
  '👉 내 위치 진단',
  '👉 왜 기술만으로는 안 되는가',
  '👉 결로 고단가 만드는 구조',
  '👉 경영 커리큘럼 소개',
];

const storyLines = [
  {
    emoji: '⚠️',
    lines: ['기술만 있으면', '될 줄 알았습니다.'],
  },
  {
    emoji: '🔥',
    lines: ['광고비는 나가는데', '예약은 그대로였습니다.'],
  },
  {
    emoji: '⚠️',
    lines: ['아이 보며 버티는 하루,', '그게 한계였습니다.'],
  },
  {
    emoji: '💡',
    lines: ['문제는 기술이 아니라', '구조였습니다.'],
  },
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
    <DarkPanel className="bg-[#101010] p-3.5">
      <div className="rounded-[1.2rem] border border-[#2A2A2A] bg-[#FEE500] p-2.5 text-black">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[13px] font-semibold">{name}</p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-black/65">
              {tag}
            </p>
          </div>
          <div className="rounded-full bg-black px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#FEE500]">
            Kakao Style
          </div>
        </div>
      </div>

      <div className="mt-2.5 space-y-2.5">
        <div className="max-w-[88%] rounded-[1.05rem] rounded-tl-sm bg-[#1B1B1B] px-3.5 py-2.5 text-[13px] leading-5 text-white/88">
          {summary}
        </div>
        <div className="ml-auto max-w-[92%] rounded-[1.05rem] rounded-tr-sm bg-[#D4AF37] px-3.5 py-2.5 text-[13px] leading-5 text-black">
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
      <DarkPanel className="overflow-hidden bg-[#111111] p-3.5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
              Result {String(index + 1).padStart(2, '0')}
            </p>
            <h3 className="mt-1.5 text-[1.2rem] font-semibold text-white">{title}</h3>
          </div>
          <div className="rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#F5E6B3]">
            {kind === 'image' ? 'Hero Result' : 'Replace Slot'}
          </div>
        </div>

        <p className="mt-2.5 whitespace-pre-line text-[13px] font-medium leading-5 text-white/68">{text}</p>

        <div
          className={`mt-4 overflow-hidden rounded-[1.35rem] border ${
            kind === 'image'
              ? 'border-[#D4AF37]/20 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.22),_transparent_42%),linear-gradient(135deg,_#171717_0%,_#0E0E0E_100%)]'
              : 'border-white/10 bg-[#171717]'
          }`}
        >
          {kind === 'image' ? (
            <div className="grid grid-cols-2 gap-px bg-black/30">
              <div className="flex aspect-[4/4.35] flex-col items-center justify-center bg-[#1B1B1B] p-3 text-center">
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
                  Before
                </span>
                <div className="mt-2.5 h-16 w-16 rounded-full border border-dashed border-white/12 bg-[#242424]" />
              </div>
              <div className="flex aspect-[4/4.35] flex-col items-center justify-center bg-[#131313] p-3 text-center">
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
                  After
                </span>
                <div className="mt-2.5 h-16 w-16 rounded-full border border-dashed border-[#D4AF37]/24 bg-[#211A08]" />
              </div>
            </div>
          ) : (
            <div className="flex aspect-[4/4.35] items-center justify-center px-5 text-center text-[13px] leading-5 text-white/45">
              실제 Before / After 결과 이미지 또는 짧은 영상 교체 영역
            </div>
          )}
        </div>
      </DarkPanel>
    </Reveal>
  );
}

function HeroPortraitCard() {
  const [imageFailed, setImageFailed] = useState(false);

  if (!imageFailed) {
    return (
      <div className="relative -mx-2 overflow-hidden rounded-[1.8rem] bg-[linear-gradient(180deg,_rgba(255,255,255,0.02),_rgba(255,255,255,0))] sm:mx-0">
        <div className="relative aspect-[4/5] max-h-[420px] w-full overflow-hidden bg-[#050505] sm:max-h-[440px]">
          <img
            src="/images/ceo.jpg"
            alt="카리스뷰티 대표"
            className="h-full w-full object-cover object-[center_12%]"
            loading="eager"
            fetchPriority="high"
            onError={() => setImageFailed(true)}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.02)_38%,rgba(0,0,0,0.68)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/34 to-transparent px-5 pb-5 pt-20">
            <p className="text-[12px] font-semibold tracking-[-0.01em] text-white/90">
              대표의 얼굴이 먼저 신뢰를 만듭니다
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative -mx-2 overflow-hidden rounded-[1.8rem] bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.12),_transparent_34%),linear-gradient(180deg,_#151515_0%,_#0C0C0C_100%)] p-4 sm:mx-0">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D4AF37]">
            Hero Visual
          </p>
          <h3 className="mt-2 text-xl font-semibold text-white">
            여성 1인샵 대표
            <span className="block text-[#F5E6B3]">placeholder</span>
          </h3>
        </div>
        <div className="rounded-full bg-[#D4AF37] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-black">
          working mom
        </div>
      </div>

      <div className="relative mt-4 flex aspect-[4/5] max-h-[420px] items-end justify-center overflow-hidden rounded-[1.45rem] bg-[radial-gradient(circle_at_top,_rgba(245,230,179,0.14),_transparent_32%),#171717]">
        <div className="absolute inset-x-0 top-0 h-20 bg-[linear-gradient(180deg,rgba(212,175,55,0.18),transparent)]" />
        <div className="absolute left-6 top-6 rounded-full bg-black/50 px-3 py-2 text-xs font-semibold text-white/75">
          ⚠️ 바쁨
        </div>
        <div className="absolute right-6 top-16 rounded-full bg-[#D4AF37]/12 px-3 py-2 text-xs font-semibold text-[#F5E6B3]">
          💡 시스템 운영
        </div>
        <div className="absolute bottom-0 h-[76%] w-[46%] rounded-t-[9rem] bg-[linear-gradient(180deg,#2C2C2C_0%,#111111_100%)]" />
        <div className="absolute bottom-[58%] h-20 w-20 rounded-full bg-[linear-gradient(180deg,#3B3B3B_0%,#202020_100%)]" />
        <div className="absolute bottom-6 rounded-full border border-white/10 bg-black/48 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/65">
          실제 대표 이미지 교체 영역
        </div>
      </div>
    </div>
  );
}

function Wrap({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[640px] ${className}`.trim()}>{children}</div>;
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
    <section id={id} className={`px-4 py-5 sm:px-5 sm:py-7 ${toneClass} ${className}`.trim()}>
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
      className={`rounded-[1.3rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] p-3.5 shadow-[0_12px_26px_rgba(0,0,0,0.18)] ${className}`.trim()}
    >
      {children}
    </div>
  );
}

function LightPanel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-[1.2rem] border border-black/8 bg-white/85 p-3.5 shadow-[0_10px_20px_rgba(0,0,0,0.07)] ${className}`.trim()}
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

  return <div className={`rounded-[0.95rem] border px-3 py-2 text-[13px] leading-5 ${toneClass} ${className}`.trim()}>{children}</div>;
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
          className={`rounded-[1.45rem] border p-4 sm:p-5 ${
            light
              ? 'border-black/10 bg-white/70 text-[#111111]'
              : 'border-[#D4AF37]/18 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.16),_transparent_36%),#0E0E0E] text-white'
          }`}
        >
          <div className="space-y-1">
            {lines.map((line, index) => (
              <p
                key={line}
                className={`text-[2.05rem] font-semibold leading-[1.04] tracking-[-0.04em] sm:text-[2.8rem] ${
                  index === lines.length - 1 ? (light ? 'text-[#8A6910]' : 'text-[#F5E6B3]') : ''
                }`}
              >
                {line}
              </p>
            ))}
          </div>
          {subtitle ? (
            <p className={`mt-3 text-[13px] leading-5 ${light ? 'text-[#463F33]' : 'text-white/60'}`}>{subtitle}</p>
          ) : null}
        </div>
      </Reveal>
    </Block>
  );
}

function StrongCTA({
  label = '지금 안 바꾸면 계속 똑같습니다',
  href = WEBINAR_CTA,
  variant = 'primary',
}: {
  label?: string;
  href?: string;
  variant?: 'primary' | 'secondary';
}) {
  return (
    <CTAButton
      href={href}
      label={label}
      variant={variant}
      className={`w-full justify-center px-6 text-[14px] ${variant === 'primary' ? 'min-h-[52px]' : 'min-h-[48px]'}`}
    />
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
            <CTAButton href={WEBINAR_CTA} label="지금 안 바꾸면 계속 똑같습니다" />
          </div>
        </Wrap>
      </header>

      <main className="pb-28 sm:pb-0">
        <section className="px-3 pb-4 pt-3 sm:px-4 sm:pb-5 sm:pt-4">
          <div className="mx-auto w-full max-w-[680px]">
            <Reveal>
              <div>
                <HeroPortraitCard />
              </div>

              <div className="mt-2.5 inline-flex items-center rounded-full border border-[#D4AF37]/15 bg-[#0E0E0E] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#F5E6B3]">
                ⚠ 1인샵 대표님
              </div>

              <p className="mt-2.5 text-[1rem] font-semibold leading-[1.22] tracking-[-0.02em] text-white sm:text-[1.08rem]">
                <span className="block">잘하는데 예약이 안 찬다면</span>
              </p>

              <h1 className="mt-2 text-[2.5rem] font-semibold leading-[1.1] tracking-[-0.04em] text-white sm:text-[2.9rem]">
                <span className="block">문제는 기술이 아니라</span>
                <span className="block text-[#F5E6B3]">운영 구조입니다</span>
              </h1>

              <div className="mt-3.5">
                <CTAButton
                  href={WEBINAR_CTA}
                  label="지금 안 바꾸면 계속 똑같습니다"
                  className="min-h-[54px] w-full justify-center px-6 text-[14px]"
                />
                <p className="mt-2 text-[13px] leading-5 text-white/62">
                  무료 웨비나에서 내 운영 구조를 먼저 점검합니다.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <Block className="pt-3 pb-5 sm:pt-4 sm:pb-6">
          <Reveal>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D4AF37]">
                02. 공감 체크리스트
              </p>
              <h2 className="mt-2 text-[1.58rem] font-semibold leading-[1.12] tracking-[-0.03em] text-white sm:text-[1.9rem]">
                혹시 지금도
                <span className="block text-[#F5E6B3]">혼자 다 하고 있나요?</span>
              </h2>
            </div>
          </Reveal>

          <div className="mt-3 grid grid-cols-2 gap-2">
            {empathyChecklist.map((item) => (
              <Bubble key={item} className="min-h-[36px] px-3 py-1.5 text-[11px] font-semibold leading-[1.25]">
                {item}
              </Bubble>
            ))}
          </div>

          <Reveal>
            <div className="mt-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/45">
                Change Flow
              </p>
              <p className="mt-2 text-sm font-semibold leading-5 text-white/76">
                바쁨 → 시스템 → 워킹맘
              </p>
            </div>
          </Reveal>

          <div className="mt-3 -mx-1 flex snap-x snap-mandatory gap-2 overflow-x-auto px-1 pb-1 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0">
            <DarkPanel className="min-w-[190px] snap-start bg-[#131313] p-3 sm:min-w-0">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#D4AF37]/10 text-[#F5E6B3]">
                  <AlarmClock className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="text-[0.9rem] font-semibold leading-[1.08] text-white">⚠️ 바쁨</p>
                  <p className="mt-1 text-[11px] leading-4 text-white/60">돈 안 됨, 멘탈 붕괴</p>
                </div>
              </div>
            </DarkPanel>

            <DarkPanel className="min-w-[190px] snap-start border-[#D4AF37]/18 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.16),_transparent_30%),#121212] p-3 sm:min-w-0">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#D4AF37]/10 text-[#F5E6B3]">
                  <Workflow className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="text-[0.9rem] font-semibold leading-[1.08] text-white">💡 시스템</p>
                  <p className="mt-1 text-[11px] leading-4 text-white/60">예약 흐름, 운영 기준</p>
                </div>
              </div>
            </DarkPanel>

            <DarkPanel className="min-w-[190px] snap-start bg-[#131313] p-3 sm:min-w-0">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#D4AF37]/10 text-[#F5E6B3]">
                  <HeartHandshake className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="text-[0.9rem] font-semibold leading-[1.08] text-white">🔥 워킹맘</p>
                  <p className="mt-1 text-[11px] leading-4 text-white/60">안정, 시스템 운영</p>
                </div>
              </div>
            </DarkPanel>
          </div>
        </Block>

        <StopScreen
          lines={['잘하는데 안 되는 이유,', '구조 때문입니다.']}
          subtitle="기술이 모자라서가 아닙니다. 혼자 다 떠안는 방식이 문제입니다."
        />

        <Block tone="cream">
          <Reveal>
            <Eyebrow light>03. 내 스토리</Eyebrow>
            <h2 className="mt-4 text-[2.35rem] font-semibold leading-[1.04] tracking-[-0.05em] sm:text-[2.9rem]">
              기술이면 될 줄 알았습니다.
              <span className="block text-[#8A6910]">그래서 더 지쳤습니다.</span>
            </h2>
          </Reveal>

          <div className="mt-4 space-y-2.5">
            {storyLines.map((story, index) => (
              <Reveal key={story.lines.join('-')} delay={index * 0.04}>
                <LightPanel className="p-3">
                  <div className="flex items-start gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black text-white">
                      <span className="text-[13px]">{story.emoji}</span>
                    </div>
                    <Bubble tone="light" className="flex-1 border-black/10 bg-[#F8F2E6] px-3 py-2 text-[14px] font-semibold leading-5">
                      <span className="block">{story.lines[0]}</span>
                      <span className="block">{story.lines[1]}</span>
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
            <h2 className="mt-4 text-[2.2rem] font-semibold leading-[0.96] tracking-[-0.04em] text-white sm:text-[3.1rem]">
              바쁨은 줄고
              <span className="block text-[#F5E6B3]">운영은 남아야 합니다</span>
            </h2>
          </Reveal>

          <div className="mt-4 space-y-2.5">
            {[
              ['Before', '불안', 'After', '안정'],
              ['Before', '노동', 'After', '시스템'],
            ].map(([leftTag, left, rightTag, right]) => (
              <Reveal key={left + right}>
                <DarkPanel className="bg-[#101010]">
                  <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                    <div className="rounded-[1rem] border border-white/10 bg-[#151515] px-4 py-4 text-center">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">{leftTag}</p>
                      <p className="mt-1.5 text-[1.08rem] font-semibold text-white">{left}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-[#D4AF37]" />
                    <div className="rounded-[1rem] border border-[#D4AF37]/18 bg-[#D4AF37]/10 px-4 py-4 text-center">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#F5E6B3]">{rightTag}</p>
                      <p className="mt-1.5 text-[1.08rem] font-semibold text-white">{right}</p>
                    </div>
                  </div>
                </DarkPanel>
              </Reveal>
            ))}
          </div>
        </Block>

        <StopScreen
          lines={['지금 방식 계속하면', '절대 안 바뀝니다.']}
          tone="cream"
          subtitle="잘하는데 안 되는 이유, 결국 구조 때문입니다."
        />

        <Block>
          <Reveal>
            <Eyebrow>06. 해결 구조</Eyebrow>
            <h2 className="mt-4 text-[2.2rem] font-semibold leading-[0.96] tracking-[-0.04em] text-white sm:text-[3.1rem]">
              기술만 배우면
              <span className="block text-[#F5E6B3]">다시 같은 자리입니다</span>
            </h2>
          </Reveal>

          <div className="mt-4 space-y-2.5">
            {structurePillars.map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal key={item.title} delay={index * 0.04}>
                  <DarkPanel className={index === 0 ? 'border-[#D4AF37]/20 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.16),_transparent_34%),#111111]' : 'bg-[#111111]'}>
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D4AF37]/10 text-[#F5E6B3]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[1.12rem] font-semibold text-white">{item.title}</p>
                        <p className="mt-1.5 whitespace-pre-line text-[13px] font-medium leading-5 text-white/72">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </DarkPanel>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.06}>
            <div className="mt-5">
              <StrongCTA label="지금 안 바꾸면 계속 똑같습니다" variant="secondary" />
            </div>
          </Reveal>
        </Block>

        <Block>
          <Reveal>
            <Eyebrow>07. 점 VS 결</Eyebrow>
            <h2 className="mt-4 text-[2.15rem] font-semibold leading-[0.96] tracking-[-0.04em] text-white sm:text-[2.95rem]">
              설명하면 늦습니다.
              <span className="block text-[#F5E6B3]">결과가 먼저 보여야 움직입니다.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.04} className="mt-4">
            <SplitVisualPlaceholder
              title="점 VS 결 비교 이미지"
              description="비교 이미지, 타이트샷, 결과 이미지를 나중에 쉽게 교체할 수 있게 구성했습니다."
            />
          </Reveal>

          <div className="mt-4 space-y-2.5">
            <Reveal>
              <DarkPanel>
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                  <ScanLine className="h-3.5 w-3.5" />
                  타이트샷
                </div>
                <div className="mt-2.5 flex aspect-[4/2.7] items-center justify-center rounded-[1rem] border border-dashed border-white/12 bg-[#181818] px-4 text-center text-[13px] leading-5 text-white/50">
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
                    <div key={label} className="grid grid-cols-[0.8fr_1fr_1fr] gap-2 rounded-[0.95rem] bg-[#121212] px-3 py-2.5 text-[13px]">
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
            <h2 className="mt-4 text-[2.15rem] font-semibold leading-[0.96] tracking-[-0.04em] text-white sm:text-[2.95rem]">
              설명하면 놓칩니다.
              <span className="block text-[#F5E6B3]">결과 먼저 보여야 잡힙니다.</span>
            </h2>
          </Reveal>

          <div className="mt-4 space-y-2.5">
            {resultCategories.map((title, index) => (
              <ResultCard
                key={title}
                title={title}
                text={
                  index === 0
                    ? '결과 먼저 보이면,\n질문부터 달라집니다.'
                    : '이해시키려 하지 말고\n먼저 보여줘야 합니다.'
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
            <h2 className="mt-4 text-[2.15rem] font-semibold leading-[0.96] tracking-[-0.04em] text-white sm:text-[2.95rem]">
              한 번 보여주면
              <span className="block text-[#F5E6B3]">설명은 절반으로 줄어듭니다.</span>
            </h2>
          </Reveal>

          <div className="mt-4 space-y-2.5">
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
          lines={['고객이 못 알아들으면', '절대 신청하지 않습니다.']}
          subtitle="좋아 보여도 안 됩니다. 바로 이해돼야 움직입니다."
        />

        <Block>
          <Reveal>
            <Eyebrow>11. 해결 구조</Eyebrow>
            <h2 className="mt-5 text-[2.65rem] font-semibold leading-[0.93] tracking-[-0.06em] text-white sm:text-[3.2rem]">
              이제는 기술자가 아니라
              <span className="block text-[#F5E6B3]">대표로 배워야 남습니다.</span>
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
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D4AF37]/10 text-[#F5E6B3]">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-[1.12rem] font-semibold text-white">{item.title}</p>
                      <p className="mt-1.5 text-[13px] leading-5 text-white/68">{item.text}</p>
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
            <h2 className="mt-4 text-[2.05rem] font-semibold leading-[0.98] tracking-[-0.04em] sm:text-[2.85rem]">
              손은 이미 움직입니다.
              <span className="block text-[#8A6910]">이제 결과가 보이게 배워야 합니다.</span>
            </h2>
          </Reveal>

          <div className="mt-4 grid gap-2.5">
            {technicalCurriculum.map((item, index) => (
              <Reveal key={item} delay={index * 0.03}>
                <LightPanel className="flex items-center gap-3 py-3">
                  <CheckCircle2 className="h-4 w-4 text-[#C89C24]" />
                  <p className="text-[14px] text-[#2E2820]">{item}</p>
                </LightPanel>
              </Reveal>
            ))}
          </div>
        </Block>

        <Block>
          <Reveal>
            <Eyebrow>13. 경영 커리큘럼</Eyebrow>
            <h2 className="mt-4 text-[2.05rem] font-semibold leading-[0.98] tracking-[-0.04em] text-white sm:text-[2.85rem]">
              잘하는데 안 남는 이유,
              <span className="block text-[#F5E6B3]">경영을 안 배웠기 때문입니다.</span>
            </h2>
          </Reveal>

          <div className="mt-4 grid gap-2.5">
            {businessCurriculum.map((item, index) => (
              <Reveal key={item} delay={index * 0.03}>
                <DarkPanel className="bg-[#101010]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#D4AF37]/10 text-[11px] font-semibold text-[#F5E6B3]">
                      {index + 1}
                    </div>
                    <p className="text-[14px] text-white">{item}</p>
                  </div>
                </DarkPanel>
              </Reveal>
            ))}
          </div>
        </Block>

        <Block tone="cream">
          <Reveal>
            <Eyebrow light>14. 워킹맘 마인드셋</Eyebrow>
            <h2 className="mt-4 text-[2.05rem] font-semibold leading-[0.98] tracking-[-0.04em] sm:text-[2.85rem]">
              잘하고 싶은 마음만으론
              <span className="block text-[#8A6910]">오래 못 버팁니다.</span>
            </h2>
          </Reveal>

          <div className="mt-4 space-y-2.5">
            {mindsetPoints.map((item, index) => (
              <Reveal key={item} delay={index * 0.03}>
                <LightPanel className="flex items-center gap-3 py-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white">
                    <Clock3 className="h-4 w-4" />
                  </div>
                  <Bubble tone="light" className="flex-1 border-black/10 bg-[#F8F1E5] text-[14px]">
                    {item}
                  </Bubble>
                </LightPanel>
              </Reveal>
            ))}
          </div>
        </Block>

        <StopScreen
          lines={['혼자 잘하는 사람보다,', '구조 가진 사람이 끝까지 갑니다.']}
          tone="cream"
        />

        <Block>
          <Reveal>
            <Eyebrow>15. 후기 / 증거</Eyebrow>
            <h2 className="mt-4 text-[2.05rem] font-semibold leading-[0.98] tracking-[-0.04em] text-white sm:text-[2.85rem]">
              말보다 강한 건
              <span className="block text-[#F5E6B3]">실제 반응과 실제 증거입니다.</span>
            </h2>
          </Reveal>

          <div className="mt-4 space-y-2.5">
            {reviewCards.map((item, index) => (
              <Reveal key={item.name} delay={index * 0.04}>
                <ReviewBubbleCard {...item} />
              </Reveal>
            ))}
          </div>

          <div className="mt-4 space-y-2.5">
            <Reveal>
              <CapturePlaceholder title="💬 카톡 캡처" description="문의 흐름이 바로 보이게." />
            </Reveal>
            <Reveal delay={0.04}>
              <CapturePlaceholder title="🌍 지방 / 해외 문의" description="멀리서도 찾는 증거." />
            </Reveal>
            <Reveal delay={0.08}>
              <CapturePlaceholder title="📈 매출 인증" description="숫자로 찍는 신뢰." />
            </Reveal>
            <Reveal delay={0.12}>
              <PhotoWallPlaceholder title="📸 강의 현장 사진" description="현장감이 바로 느껴지게." />
            </Reveal>
          </div>
        </Block>

        <Block id="webinar" className="bg-[#090909]">
          <Reveal>
            <Eyebrow>16. 무료 웨비나 구성</Eyebrow>
            <h2 className="mt-3 text-[2rem] font-semibold leading-[1.02] tracking-[-0.04em] text-white sm:text-[2.65rem]">
              무료로 듣는 한 번이
              <span className="block text-[#F5E6B3]">지금 흐름을 완전히 바꿉니다.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.04} className="mt-3.5">
            <DarkPanel className="border-[#D4AF37]/20 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.18),_transparent_34%),linear-gradient(135deg,_#171717_0%,_#0A0A0A_60%,_#050505_100%)] p-4">
              <div className="flex flex-wrap gap-2">
                <Bubble tone="gold" className="py-2 text-[11px] font-semibold uppercase tracking-[0.2em]">
                  선착순 50명
                </Bubble>
                <Bubble className="py-2 text-[11px] font-semibold uppercase tracking-[0.2em]">
                  이번 기수 마감 임박
                </Bubble>
              </div>

              <div className="mt-4 grid grid-cols-4 gap-2">
                {countdown.map((item) => (
                  <div key={item.label} className="rounded-[0.85rem] border border-white/10 bg-[#111111] px-2 py-2.5 text-center">
                    <div className="text-[1.1rem] font-semibold text-white">{item.value}</div>
                    <div className="mt-1 text-[9px] uppercase tracking-[0.16em] text-[#D4AF37]">{item.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-2">
                {webinarFlow.map((item, index) => (
                  <div key={item} className="flex items-start gap-3 rounded-[0.95rem] border border-white/8 bg-[#151515] px-3 py-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#D4AF37] text-[11px] font-semibold text-black">
                      {index + 1}
                    </div>
                    <p className="pt-0.5 text-[14px] leading-5 text-white/76">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <StrongCTA label="지금 안 바꾸면 계속 똑같습니다" />
                <Bubble className="py-2 text-[14px] font-medium leading-5">
                  더 늦으면 또 같은 달을 반복합니다. 지금 끊어야 다음 달이 달라집니다.
                </Bubble>
              </div>
            </DarkPanel>
          </Reveal>
        </Block>

        <Block id="final-cta">
          <Reveal>
            <DarkPanel className="border-[#D4AF37]/24 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.22),_transparent_34%),linear-gradient(135deg,_#171717_0%,_#090909_62%,_#050505_100%)] p-4 sm:p-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-black">
                <ShieldCheck className="h-3.5 w-3.5" />
                최종 CTA
              </div>
              <h2 className="mt-4 text-[2.05rem] font-semibold leading-[0.98] tracking-[-0.04em] text-white sm:text-[2.85rem]">
                계속 버틸 건가요?
                <span className="block text-[#F5E6B3]">아니면 지금 바꿀 건가요?</span>
              </h2>
              <Bubble className="mt-4 font-medium">
                잘하는데 안 되는 흐름, 여기서 끊어야 합니다.
              </Bubble>
              <div className="mt-4 flex flex-col gap-2.5">
                <StrongCTA href={FINAL_CTA} label="지금 안 바꾸면 계속 똑같습니다" />
                <Bubble className="text-sm">기술만으로는 절대 안 바뀝니다. 구조를 바꿔야 결과가 바뀝니다.</Bubble>
              </div>
            </DarkPanel>
          </Reveal>
        </Block>
      </main>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 sm:hidden">
        <div className="mx-auto w-full max-w-[620px] rounded-[1.25rem] border border-[#D4AF37]/12 bg-black/70 p-1.5 shadow-[0_-8px_28px_rgba(0,0,0,0.32)] backdrop-blur-xl">
          <button
            type="button"
            onClick={scrollToWebinar}
            className="pointer-events-auto flex w-full items-center justify-center gap-2 rounded-full border border-[#D4AF37]/35 bg-[#141414] px-5 py-3 text-[13px] font-semibold uppercase tracking-[0.16em] text-[#F5E6B3] transition-transform duration-300 active:scale-[0.98]"
          >
            <span>지금 안 바꾸면 계속 똑같습니다</span>
          </button>
        </div>
      </div>
    </div>
  );
}
