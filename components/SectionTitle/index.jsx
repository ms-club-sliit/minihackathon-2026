export default function SectionTitle({ title }) {
  return (
    <div className="w-fit max-w-full" aria-label={title}>
      <div
        className="inline-flex h-[6em] items-stretch gap-[0.6em]"
        style={{ fontSize: "clamp(6.7px, 0.365vw + 5.33px, 10px)" }}
      >
        <div className="flex items-center overflow-hidden bg-[#2E47FF] px-[3em]">
          <span
            className="translate-y-[2px] text-[5.2em] leading-none text-white"
            style={{
              fontFamily: "'Open Sans Condensed', sans-serif",
              fontWeight: 300,
              WebkitTextStroke: "0.6px white",
            }}
          >
            {title}
          </span>
        </div>
        <div className="flex items-stretch" aria-hidden="true">
          <i className="block w-[1.8em] mr-[0.4em] bg-[#2E47FF]" />
          <i className="block w-[1.1em] mr-[0.4em] bg-[#2E47FF]" />
          <i className="block w-[1em] mr-[0.3em] bg-[#2E47FF]" />
          <i className="block w-[0.5em] mr-[0.3em] bg-[#2E47FF]" />
          <i className="block w-[0.1em] min-w-[1px] bg-[#2E47FF]" />
        </div>
      </div>
    </div>
  );
}