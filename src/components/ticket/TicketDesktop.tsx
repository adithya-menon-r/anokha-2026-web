'use client';

import { format, parseISO } from 'date-fns';
import {
  Loader2,
  MapPin,
  Ticket as TicketIcon,
  User,
  Users,
} from 'lucide-react';
import React, { useState } from 'react';
import Barcode from 'react-barcode';
import QRCode from 'react-qr-code';
import { TicketProps } from '@/types/ticketTypes';

const TicketDesktop: React.FC<TicketProps> = ({ ticket, userId }) => {
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
    event_type,
    is_technical,
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
    }, 150);

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
    <div className="w-full max-w-none mx-auto p-1 filter drop-shadow-xl">
      <div className="flex flex-row">
        <div className="flex-1 relative bg-white text-black rounded-l-3xl rounded-tr-none [mask-image:radial-gradient(circle_at_bottom_left,transparent_12px,black_12.5px),radial-gradient(circle_at_bottom_right,transparent_12px,black_12.5px)] [mask-size:51%_100%] [mask-position:left,right] [mask-repeat:no-repeat] md:[mask-image:radial-gradient(circle_at_top_right,transparent_12px,black_12.5px),radial-gradient(circle_at_bottom_right,transparent_12px,black_12.5px)] md:[mask-size:100%_51%] md:[mask-position:top,bottom]">
          {/* Header */}
          <div className="bg-orange-500 pt-4 pb-2 px-6 flex justify-start items-center">
            <h1 className="text-2xl font-black tracking-widest font-spincycle text-white">
              anoKHaVERSE
            </h1>
          </div>

          <div className="flex">
            {/* Barcode Strip */}
            <div className="flex w-12 items-center justify-center my-3 ml-3 overflow-hidden">
              <div className="-rotate-90 whitespace-nowrap opacity-80">
                <Barcode
                  value={event_id}
                  width={0.47}
                  height={40}
                  displayValue={false}
                  background="transparent"
                  margin={0}
                />
              </div>
            </div>

            <div className="flex-1 p-8 pt-4 pl-5">
              {/* Event Details */}
              <div className="mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-4xl font-bold mb-2 uppercase leading-tight line-clamp-1">
                      {event_name}
                    </h2>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold pt-1">₹{price}</div>
                  </div>
                </div>
              </div>

              {/* Schedules */}
              <div className="space-y-1">
                <h3 className="text-sm font-bold uppercase text-gray-500 tracking-wider">
                  Schedule
                </h3>
                <div className="flex flex-wrap gap-3">
                  {sortedSchedules.map((schedule, index) => {
                    let formattedDate = '---';
                    let isPast = false;

                    try {
                      const scheduleDate = parseISO(schedule.event_date);
                      if (!isNaN(scheduleDate.getTime())) {
                        scheduleDate.setHours(0, 0, 0, 0);
                        isPast = scheduleDate.getTime() < today.getTime();
                        formattedDate = format(scheduleDate, 'MMM d, yyyy');
                      }
                    } catch (e) {
                      console.error('Date parsing failed', e);
                    }

                    return (
                      <div
                        key={index}
                        className={`flex-1 min-w-0 border-2 border-black rounded-xl transition-colors flex flex-col items-center justify-center text-center overflow-hidden ${
                          isPast ? 'opacity-50 bg-gray-200' : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="p-2 w-full">
                          {/* Date */}
                          <div className="text-xl font-black uppercase tracking-wide mb-1">
                            {formattedDate}
                          </div>

                          {/* Time */}
                          <div className="text-lg font-bold text-gray-700">
                            {format(new Date(schedule.start_time), 'h:mm a')} -{' '}
                            {format(new Date(schedule.end_time), 'h:mm a')}
                          </div>
                        </div>

                        {/* Venue */}
                        <div className="w-full border-t-2 border-black py-2 mt-auto flex items-center justify-center gap-2 text-xs font-medium text-gray-600 bg-gray-50 min-h-[40px] px-2">
                          <MapPin size={14} className="flex-shrink-0" />
                          <span className="text-center break-words leading-tight">
                            {event_mode === 'ONLINE'
                              ? 'ONLINE'
                              : schedule.venue}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Dashed Line */}
          <div className="absolute top-0 bottom-0 right-0 w-[2px] border-r-2 border-dashed border-gray-300"></div>
        </div>

        {/* Right Section */}
        <div className="w-64 bg-gray-50 flex flex-col relative rounded-r-3xl rounded-bl-none [mask-image:radial-gradient(circle_at_top_left,transparent_12px,black_12.5px),radial-gradient(circle_at_top_right,transparent_12px,black_12.5px)] [mask-size:51%_100%] [mask-position:left,right] [mask-repeat:no-repeat] md:[mask-image:radial-gradient(circle_at_top_left,transparent_12px,black_12.5px),radial-gradient(circle_at_bottom_left,transparent_12px,black_12.5px)] md:[mask-size:100%_51%] md:[mask-position:top,bottom]">
          {/* Header */}
          <div className="bg-orange-500 p-4 h-[56px] flex items-center justify-center border-l-0 border-t-0 border-dashed border-white/20">
            <div className="flex items-center gap-2 px-4 py-1.5 bg-black/20 text-white rounded-full text-sm font-bold uppercase tracking-wider backdrop-blur-sm border border-white/20 shadow-sm">
              {is_group ? <Users size={16} /> : <User size={16} />}
              <span className="max-w-[180px] truncate">
                {is_group ? team_name || 'GROUP' : 'INDIVIDUAL'}
              </span>
            </div>
          </div>

          <div className="p-6 pb-3 flex flex-col items-center flex-1 w-full">
            <div className="flex-1 flex flex-col items-center justify-center w-full">
              <div
                className={`bg-white p-2 rounded-lg shadow-sm border border-gray-200 mb-4 relative overflow-hidden ${
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
                    size={128}
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

              <div className="text-center space-y-1">
                <p className="text-xs font-mono text-gray-500 break-all">
                  SCAN TO CHECK IN/OUT
                </p>
              </div>
            </div>

            <div className="pt-4 w-full">
              <div className="border-t border-gray-300 pt-2 flex justify-between items-center text-xs text-gray-400">
                <span className="uppercase">
                  {is_technical ? 'TECHNICAL' : 'NON-TECHNICAL'} {event_type}
                </span>
                <TicketIcon size={12} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDesktop;
