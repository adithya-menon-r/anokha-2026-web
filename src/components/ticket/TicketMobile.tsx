'use client';

import { format, parseISO } from 'date-fns';
import { Loader2, MapPin, User, Users } from 'lucide-react';
import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import { TicketProps } from '@/types/ticketTypes';

const TicketMobile: React.FC<TicketProps> = ({ ticket, userId }) => {
  const [isGenerated, setIsGenerated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [qrKey, setQrKey] = useState(0);

  const {
    event_id,
    event_name,
    schedules,
    is_group,
    team_name,
    price,
    event_mode,
  } = ticket;

  const sortedSchedules = [...schedules].sort((a, b) => {
    return new Date(a.event_date).getTime() - new Date(b.event_date).getTime();
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isEventOver =
    sortedSchedules.length > 0 &&
    sortedSchedules.every((s) => {
      const sDate = parseISO(s.event_date);
      sDate.setHours(0, 0, 0, 0);
      return sDate.getTime() < today.getTime();
    });

  const handleGenerateQR = () => {
    setIsGenerating(true);
    let count = 0;
    const interval = setInterval(() => {
      setQrKey((prev) => prev + 1);
      count++;
      if (count > 15) clearInterval(interval);
    }, 75);

    setTimeout(() => {
      clearInterval(interval);
      setIsGenerating(false);
      setIsGenerated(true);
    }, 1500);
  };

  const qrData = JSON.stringify({
    student_id: userId,
    event_id: event_id,
    ...(isGenerating ? { _random: qrKey } : {}),
  });

  return (
    <div className="w-full max-w-sm mx-auto p-0 filter drop-shadow-xl">
      <div className="bg-white text-black rounded-3xl overflow-hidden flex flex-col relative">
        {/* Header */}
        <div className="bg-orange-500 py-4 px-6 pb-2 flex justify-center items-center">
          <h1 className="text-2xl font-black tracking-widest font-spincycle text-white">
            anoKHaVERSE
          </h1>
        </div>

        <div className="p-6 flex flex-col gap-6 pb-8">
          {/* Event Name */}
          <h2 className="text-3xl font-bold text-center uppercase leading-tight line-clamp-3">
            {event_name}
          </h2>

          {/* Price */}
          <div className="flex justify-center">
            <div className="border-2 border-black rounded-lg px-6 py-2 text-2xl font-bold">
              ₹{price}
            </div>
          </div>

          {/* Schedule */}
          <div className="space-y-2 w-full">
            <h3 className="text-sm font-bold uppercase text-gray-500 tracking-wider text-left">
              Schedule
            </h3>
            <div className="flex flex-col gap-3">
              {sortedSchedules.length === 0 ? (
                <div className="w-full border-2 border-black rounded-xl flex flex-col items-center justify-center text-center overflow-hidden">
                  <div className="p-3 w-full">
                    <div className="text-xl font-black uppercase tracking-wide mb-1">
                      TBD
                    </div>
                    <div className="text-lg font-bold text-gray-700">TBD</div>
                  </div>
                  <div className="w-full border-t-2 border-black py-2 flex items-center justify-center gap-0 px-2 text-sm font-medium text-gray-600 bg-gray-50">
                    <MapPin size={14} className="flex-shrink-0" />
                    <span className="text-center px-1.5">TBD</span>
                  </div>
                </div>
              ) : (
                sortedSchedules.map((schedule, index) => {
                  let formattedDate = 'TBD';
                  let formattedTime = 'TBD';
                  let venueDisplay = 'TBD';
                  let isPast = false;

                  try {
                    if (schedule && schedule.event_date) {
                      const scheduleDate = parseISO(schedule.event_date);
                      if (!isNaN(scheduleDate.getTime())) {
                        scheduleDate.setHours(0, 0, 0, 0);
                        isPast = scheduleDate.getTime() < today.getTime();
                        formattedDate = format(scheduleDate, 'MMM d, yyyy');
                      }
                    }
                  } catch (e) {
                    console.error('Date parsing failed', e);
                    formattedDate = 'TBD';
                  }

                  try {
                    if (schedule && schedule.start_time && schedule.end_time) {
                      const start = new Date(schedule.start_time);
                      const end = new Date(schedule.end_time);
                      if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
                        formattedTime = `${format(start, 'h:mm a')} - ${format(
                          end,
                          'h:mm a',
                        )}`;
                      }
                    }
                  } catch (e) {
                    console.error('Time parsing failed', e);
                    formattedTime = 'TBD';
                  }

                  if (event_mode === 'ONLINE') {
                    venueDisplay = 'ONLINE';
                  } else if (schedule && schedule.venue) {
                    venueDisplay = schedule.venue;
                  }

                  return (
                    <div
                      key={index}
                      className={`w-full border-2 border-black rounded-xl flex flex-col items-center justify-center text-center overflow-hidden ${
                        isPast ? 'opacity-50 bg-gray-200' : ''
                      }`}
                    >
                      <div className="p-3 w-full">
                        <div className="text-xl font-black uppercase tracking-wide mb-1">
                          {formattedDate}
                        </div>
                        <div className="text-lg font-bold text-gray-700">
                          {formattedTime}
                        </div>
                      </div>
                      <div className="w-full border-t-2 border-black py-2 flex items-center justify-center gap-0 px-2 text-sm font-medium text-gray-600 bg-gray-50">
                        <MapPin size={14} className="flex-shrink-0" />
                        <span className="text-center px-1.5">
                          {venueDisplay}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="relative w-full flex items-center justify-center">
          <div className="w-full border-t-2 border-dashed border-gray-300"></div>
        </div>

        {/* QR Section */}
        <div className="p-6 pt-8 flex flex-col items-center gap-6">
          <div
            className={`bg-white p-2 rounded-lg shadow-sm border border-gray-200 relative overflow-hidden ${
              isEventOver ? 'opacity-50 grayscale' : ''
            }`}
          >
            <div
              className={`transition-all duration-300 ${
                !isGenerated && !isEventOver ? 'blur-[3px] opacity-60' : ''
              }`}
            >
              <QRCode
                value={qrData}
                size={160}
                style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                viewBox={`0 0 256 256`}
              />
            </div>

            {!isGenerated && !isEventOver && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                {isGenerating ? (
                  <Loader2 className="w-8 h-8 animate-spin text-black" />
                ) : (
                  <button
                    onClick={handleGenerateQR}
                    className="bg-black hover:bg-gray-800 text-white text-[10px] font-bold py-1.5 px-3 rounded shadow-md transition-colors uppercase tracking-wider"
                  >
                    Generate QR
                  </button>
                )}
              </div>
            )}
          </div>

          <p className="text-xs font-mono text-gray-500 tracking-widest">
            SCAN TO CHECK IN/OUT
          </p>

          <div className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-sm font-bold uppercase tracking-wider shadow-sm">
            {is_group ? <Users size={16} /> : <User size={16} />}
            <span className="max-w-[190px] truncate">
              {is_group ? team_name || 'GROUP' : 'INDIVIDUAL'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketMobile;
