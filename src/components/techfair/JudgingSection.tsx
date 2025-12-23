export default function JudgingSection() {
  const criteriaList = [
    'Innovation & Originality - Place Holder',
    'Technical Feasibility - Place Holder',
    'Impact & Practical Relevance - Place Holder',
    'Execution & Implementation Quality - Place Holder',
    'Clarity of Presentation - Place Holder',
  ];

  return (
    <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 fade-in-section">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-2 bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-400/30 rounded-full text-orange-300 text-sm font-semibold tracking-wider uppercase mb-6">
            Evaluation
          </div>
          <h2 className="font-nk57  text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-300 to-amber-400 bg-clip-text text-transparent leading-[1.2] pb-1">
            Judging Criteria
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
            Exact details will be announced soon
          </p>
        </div>

        <div className="relative bg-gradient-to-br from-orange-900/10 to-amber-900/10 backdrop-blur-md border border-orange-400/20 rounded-3xl p-10 sm:p-14 lg:p-18">
          {/* Criteria List */}
          <div className="max-w-4xl mx-auto space-y-6">
            {[
              'Innovation & Originality - Place Holder',
              'Technical Feasibility - Place Holder',
              'Impact & Practical Relevance - Place Holder',
              'Execution & Implementation Quality - Place Holder',
              'Clarity of Presentation - Place Holder',
            ].map((criteria, index) => (
              <div
                key={index}
                className="flex items-start gap-4 pb-6 border-b border-orange-400/20 last:border-b-0"
              >
                {/* Number */}
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-orange-500/30 to-amber-600/30 text-orange-300 font-semibold flex items-center justify-center">
                  {index + 1}
                </div>
                {/* Text */}
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-orange-200">
                    {criteria}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    Detailed evaluation points and weightage will be announced
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div className="mt-12 flex justify-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-orange-900/20 border border-orange-400/30 rounded-full">
              <svg
                className="w-5 h-5 text-orange-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-orange-300 text-sm font-medium">
                Comprehensive judging criteria will be shared with participants
                ahead of the event
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
