import { Play, Sparkles, SplitSquareVertical, Waves } from 'lucide-react';

type PlaceholderProps = {
  title: string;
  description: string;
  className?: string;
};

export function TextureComparisonPlaceholder({
  title,
  description,
  className = '',
}: PlaceholderProps) {
  return (
    <div
      className={`flex flex-col overflow-hidden rounded-[2rem] border border-[#D4AF37]/20 bg-gradient-to-br from-[#111111] to-[#050505] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)] ${className}`.trim()}
    >
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#D4AF37]">
            Dot vs Texture
          </p>
          <h3 className="mt-2 text-xl font-semibold text-white">{title}</h3>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/10 text-[#F5E6B3]">
          <Waves className="h-5 w-5" />
        </div>
      </div>
      <p className="mb-6 max-w-2xl text-sm leading-6 text-[#CCCCCC]">{description}</p>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[1.6rem] border border-white/8 bg-[#0D0D0D] p-5">
          <div className="mb-4 flex items-center gap-2 text-sm font-medium text-white/80">
            <SplitSquareVertical className="h-4 w-4 text-[#D4AF37]" />
            점으로만 찍는 홍보
          </div>
          <div className="grid h-44 grid-cols-6 gap-2 rounded-[1.25rem] bg-[#050505] p-3">
            {Array.from({ length: 24 }).map((_, index) => (
              <div
                key={index}
                className="rounded-full bg-[#D4AF37]/70"
                style={{ opacity: 0.3 + ((index % 5) * 0.12) }}
              />
            ))}
          </div>
        </div>
        <div className="rounded-[1.6rem] border border-[#D4AF37]/20 bg-[#121212] p-5">
          <div className="mb-4 flex items-center gap-2 text-sm font-medium text-white/80">
            <Sparkles className="h-4 w-4 text-[#D4AF37]" />
            결이 느껴지는 브랜딩
          </div>
          <div className="relative h-44 overflow-hidden rounded-[1.25rem] border border-white/6 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.18),_transparent_40%),linear-gradient(135deg,_#0A0A0A_0%,_#171717_50%,_#0B0B0B_100%)]">
            <div className="absolute inset-x-0 top-10 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />
            <div className="absolute inset-x-10 top-20 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            <div className="absolute inset-x-16 bottom-12 h-px bg-gradient-to-r from-transparent via-[#F5E6B3]/60 to-transparent" />
            <div className="absolute inset-y-0 left-14 w-px bg-gradient-to-b from-transparent via-[#D4AF37]/60 to-transparent" />
            <div className="absolute inset-y-6 right-20 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent" />
          </div>
        </div>
      </div>
      <div className="mt-5 grid gap-3 rounded-[1.4rem] border border-white/8 bg-[#0C0C0C] p-4 sm:grid-cols-3">
        {['브랜드 비교 이미지', '콘텐츠 샘플 슬라이드', '강의 자료 캡처'].map((slot) => (
          <div
            key={slot}
            className="rounded-[1rem] border border-dashed border-[#D4AF37]/20 bg-[#121212] px-3 py-4 text-center text-xs uppercase tracking-[0.18em] text-[#B9B9B9]"
          >
            {slot}
          </div>
        ))}
      </div>
    </div>
  );
}

export function BeforeAfterPlaceholder({
  title,
  description,
  className = '',
}: PlaceholderProps) {
  return (
    <div
      className={`flex flex-col overflow-hidden rounded-[2rem] border border-[#D4AF37]/20 bg-gradient-to-br from-[#141414] to-[#080808] p-5 ${className}`.trim()}
    >
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#D4AF37]">
            Before / After
          </p>
          <h3 className="mt-2 text-xl font-semibold text-white">{title}</h3>
        </div>
        <div className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-[#CCCCCC]">
          자료 교체용
        </div>
      </div>
      <p className="mb-6 text-sm leading-6 text-[#CCCCCC]">{description}</p>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[1.5rem] border border-white/8 bg-[#0C0C0C] p-5">
          <div className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-white/50">Before</div>
          <div className="flex h-56 items-center justify-center rounded-[1.2rem] border border-dashed border-white/15 bg-[#161616] text-sm text-[#9A9A9A]">
            기존 화면 / 전환 전 자료 삽입
          </div>
        </div>
        <div className="rounded-[1.5rem] border border-[#D4AF37]/20 bg-[#111111] p-5">
          <div className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#F5E6B3]">After</div>
          <div className="flex h-56 items-center justify-center rounded-[1.2rem] border border-dashed border-[#D4AF37]/30 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.12),_transparent_42%),#171717] text-sm text-[#E8D28A]">
            개선 화면 / 결과 자료 삽입
          </div>
        </div>
      </div>
      <div className="mt-5 rounded-[1.4rem] border border-white/8 bg-[#0C0C0C] p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">교체 가이드</p>
        <p className="mt-3 text-sm leading-6 text-[#CCCCCC]">
          왼쪽에는 기존 화면, 오른쪽에는 개선 화면을 넣으면 바로 비교 가능한 구조입니다.
          랜딩, 소개 프로필, 후기 배치, 예약 페이지 캡처를 그대로 교체할 수 있습니다.
        </p>
      </div>
    </div>
  );
}

export function VideoPlaceholder({ title, description, className = '' }: PlaceholderProps) {
  return (
    <div
      className={`flex flex-col overflow-hidden rounded-[2rem] border border-[#D4AF37]/20 bg-gradient-to-br from-[#121212] to-[#040404] p-5 ${className}`.trim()}
    >
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#D4AF37]">
            Video Slot
          </p>
          <h3 className="mt-2 text-xl font-semibold text-white">{title}</h3>
        </div>
        <div className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-[#CCCCCC]">
          영상 교체용
        </div>
      </div>
      <p className="mb-6 text-sm leading-6 text-[#CCCCCC]">{description}</p>
      <div className="relative aspect-video overflow-hidden rounded-[1.6rem] border border-white/8 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.16),_transparent_35%),linear-gradient(135deg,_#090909_0%,_#1A1A1A_40%,_#090909_100%)]">
        <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-black/40 text-[#F5E6B3] backdrop-blur">
            <Play className="ml-1 h-8 w-8 fill-current" />
          </div>
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-white/65">
            인터뷰 / 강의 하이라이트 / 후기 영상
          </p>
        </div>
      </div>
      <div className="mt-5 grid gap-3 rounded-[1.4rem] border border-white/8 bg-[#0C0C0C] p-4 sm:grid-cols-3">
        {['인터뷰 영상', '후기 영상', '강의 티저'].map((item) => (
          <div
            key={item}
            className="rounded-[1rem] border border-dashed border-white/12 bg-[#121212] px-3 py-4 text-center text-xs uppercase tracking-[0.18em] text-[#B9B9B9]"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
