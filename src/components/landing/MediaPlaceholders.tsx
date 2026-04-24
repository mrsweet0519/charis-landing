import {
  Camera,
  Clapperboard,
  Columns2,
  ImagePlus,
  MessageSquareQuote,
  ScanSearch,
  Sparkles,
} from 'lucide-react';

type BasePlaceholderProps = {
  title: string;
  description: string;
  className?: string;
};

export function SplitVisualPlaceholder({
  title,
  description,
  className = '',
}: BasePlaceholderProps) {
  return (
    <div
      className={`overflow-hidden rounded-[2rem] border border-[#D4AF37]/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] ${className}`.trim()}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D4AF37]">
            Replaceable Visual
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-white">{title}</h3>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#CFCFCF]">{description}</p>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/10 text-[#F5E6B3]">
          <Columns2 className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-[1.5rem] border border-white/8 bg-[#0E0E0E] p-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
            <ScanSearch className="h-4 w-4 text-[#D4AF37]" />
            Left Slot
          </div>
          <div className="mt-4 flex h-56 items-center justify-center rounded-[1.2rem] border border-dashed border-white/12 bg-[#151515] text-center text-sm leading-6 text-white/50">
            비교용 이미지, 타이트샷,
            <br />
            Before 컷 교체 영역
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-[#D4AF37]/20 bg-[#121212] p-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#F5E6B3]">
            <Sparkles className="h-4 w-4 text-[#D4AF37]" />
            Right Slot
          </div>
          <div className="mt-4 flex h-56 items-center justify-center rounded-[1.2rem] border border-dashed border-[#D4AF37]/26 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.14),_transparent_44%),#171717] text-center text-sm leading-6 text-[#EAD9A0]">
            결 표현 이미지, After 컷,
            <br />
            결과 중심 비주얼 교체 영역
          </div>
        </div>
      </div>
    </div>
  );
}

export function VideoSlotPlaceholder({
  title,
  description,
  className = '',
}: BasePlaceholderProps) {
  return (
    <div
      className={`overflow-hidden rounded-[2rem] border border-white/10 bg-[#101010] p-5 ${className}`.trim()}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D4AF37]">
            Demo Video Slot
          </p>
          <h3 className="mt-2 text-xl font-semibold text-white">{title}</h3>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#F5E6B3]">
          <Clapperboard className="h-5 w-5" />
        </div>
      </div>

      <p className="mt-3 text-sm leading-6 text-[#CFCFCF]">{description}</p>

      <div className="relative mt-5 aspect-video overflow-hidden rounded-[1.4rem] border border-dashed border-[#D4AF37]/24 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.16),_transparent_34%),linear-gradient(135deg,_#0A0A0A_0%,_#171717_50%,_#0A0A0A_100%)]">
        <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-black/45 text-[#F5E6B3]">
            <Clapperboard className="h-7 w-7" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
            짧은 시연 영상 교체 영역
          </p>
        </div>
      </div>
    </div>
  );
}

export function CapturePlaceholder({
  title,
  description,
  className = '',
}: BasePlaceholderProps) {
  return (
    <div
      className={`overflow-hidden rounded-[2rem] border border-white/10 bg-[#121212] p-5 ${className}`.trim()}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D4AF37]">
            Proof Capture
          </p>
          <h3 className="mt-2 text-xl font-semibold text-white">{title}</h3>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#F5E6B3]">
          <MessageSquareQuote className="h-5 w-5" />
        </div>
      </div>

      <p className="mt-3 text-sm leading-6 text-[#CFCFCF]">{description}</p>

      <div className="mt-5 rounded-[1.5rem] border border-dashed border-white/12 bg-[#191919] p-4">
        <div className="rounded-[1.1rem] border border-[#2A2A2A] bg-[#101010] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FEE500] text-black">
              <MessageSquareQuote className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">캡처 자료 슬롯</p>
              <p className="text-xs uppercase tracking-[0.18em] text-white/40">replace anytime</p>
            </div>
          </div>

          <div className="mt-4 grid gap-3">
            {['문의 캡처', '상담 캡처', '인증 캡처'].map((label) => (
              <div
                key={label}
                className="rounded-[1rem] bg-[#1E1E1E] px-4 py-3 text-sm text-white/70"
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function PhotoWallPlaceholder({
  title,
  description,
  className = '',
}: BasePlaceholderProps) {
  return (
    <div
      className={`overflow-hidden rounded-[2rem] border border-[#D4AF37]/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-5 ${className}`.trim()}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D4AF37]">
            Photo Wall
          </p>
          <h3 className="mt-2 text-xl font-semibold text-white">{title}</h3>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/10 text-[#F5E6B3]">
          <Camera className="h-5 w-5" />
        </div>
      </div>

      <p className="mt-3 text-sm leading-6 text-[#CFCFCF]">{description}</p>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="aspect-[4/5] rounded-[1.2rem] border border-dashed border-white/12 bg-[#161616] p-3"
          >
            <div className="flex h-full flex-col items-center justify-center rounded-[0.95rem] border border-white/8 bg-[#101010] text-center text-xs uppercase tracking-[0.18em] text-white/45">
              <ImagePlus className="mb-2 h-5 w-5 text-[#D4AF37]" />
              현장 사진 {index + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
