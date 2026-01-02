import React from 'react';
import UnifiedBackground from '@/components/UnifiedBackground';

const TermsAndConditionsPage: React.FC = () => {
  return (
    <>
      <UnifiedBackground />
      <main className="relative z-10 min-h-screen flex items-center justify-center px-6 md:px-16 py-14">
        <div className="w-full max-w-6xl text-center">
          <h1 className="text-3xl md:text-6xl font-extrabold text-white text-center">
            Terms and Conditions
          </h1>

          <div className="mt-14 text-lg text-white/90 leading-relaxed text-left mx-auto max-w-6xl">
            <ul className="list-disc space-y-3 pl-5">
              <li>
                By using this page, you agree to the following terms and
                conditions.
              </li>
              <li>
                All participants are required to strictly adhere to the rules,
                regulations, policies, and guidelines prescribed by Amrita
                Vishwa Vidyapeetham, Coimbatore Campus and the Anokha 2026
                organizing committee. Failure to comply may result in
                disqualification or other disciplinary action.
              </li>

              <li>
                Participants must maintain proper discipline, decorum, and
                professional conduct at all times during the event. Any behavior
                deemed inappropriate, disruptive, or in violation of the
                university's code of conduct will be addressed in accordance
                with university policies and procedures.
              </li>

              <li>
                All participants must carry a valid institutional or
                government-issued photo ID, which must be produced upon request
                for verification at campus entry points or whenever required by
                the organizers or university authorities.
              </li>

              <li>
                The organizing committee reserves the right to take necessary
                action against any individual or team found violating rules and
                regulations, including but not limited to warnings,
                disqualification, or removal from the event premises.
              </li>

              <li>
                Participants will be permitted a single entry to the campus per
                day. Once a participant exits the campus premises on a given
                day, re-entry shall not be allowed for that day. Participants
                are advised to plan their movement and schedules accordingly to
                avoid inconvenience.
              </li>

              <li>
                Upon successful completion of registration, the participation
                shall be considered final. No refunds will be processed under
                any circumstances.
              </li>

              <li>
                Registrations are strictly non-transferable. Any transfer or
                substitution attempted may result in disqualification or removal
                from the event premises, without refund.
              </li>

              <li>
                Attendance will be recorded for each registered event and
                workshop. Participants must carry a valid institutional or
                government-issued photo ID and present it for verification
                whenever required by the organizers.
              </li>

              <li>
                The prize pool for events is subject to change. The final prize
                distribution will be determined at the sole discretion of the
                organizing committee.
              </li>

              <li>
                The decisions of the judges, organizers, and university
                authorities regarding all aspects of Anokha, including
                eligibility, evaluation, and results, shall be final and
                binding.
              </li>

              <li>
                Participants are responsible for their personal belongings. The
                organizing committee and the university shall not be held
                responsible for any loss, damage, or theft of personal items
                during the event.
              </li>

              <li>
                The organizing committee reserves the right to make changes to
                the schedule, format, rules, or venue, if deemed necessary due
                to unforeseen circumstances or operational requirements.
              </li>

              <li>
                Any matters not explicitly covered under these Terms and
                Conditions shall be addressed at the discretion of the
                organizing committee in accordance with university policies.
              </li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
};

export default TermsAndConditionsPage;
