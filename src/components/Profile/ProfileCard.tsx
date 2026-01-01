import { Avatar } from 'primereact/avatar';
import { useState } from 'react';
import QRCode from 'react-qr-code';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTickets } from '@/hooks/useTickets';
import { useAuthStore } from '@/stores/auth.store';
import { useProfileStore } from '@/stores/useProfileStore';
import { PROFILE_CARD_PROPS } from '@/types/profileTypes';

const formFields = [
  { label: 'Name', field: 'name', placeholder: 'Enter Name' },
  {
    label: 'Phone Number',
    field: 'phone_number',
    placeholder: '+91 99999 99999',
  },
  {
    label: 'College Name',
    field: 'college_name',
    placeholder: 'Enter College Name',
  },
  {
    label: 'College City',
    field: 'college_city',
    placeholder: 'Enter College City',
  },
] as const;

export function ProfileCard({
  avatarEmail,
  email,
  name,
  phone_number,
  college_name,
  college_city,
  register,
  reset,
  errors,
  onSubmit,
  isDirty,
}: PROFILE_CARD_PROPS) {
  const isEditMode = useProfileStore((state) => state.isEditMode);
  const setIsEditMode = useProfileStore((state) => state.setIsEditMode);
  const [isEditDisabled, setIsEditDisabled] = useState(false);
  const userId = useAuthStore((state) => state.user?.student_id);
  const { data: tickets } = useTickets();

  const handleEditClick = () => setIsEditMode(true);

  // Check conditions for QR Code
  // Logic: Non-Amrita Coimbatore AND Registered for an Offline Event
  const isAmritaCoimbatore =
    college_name?.toLowerCase().includes('amrita') &&
    college_city?.toLowerCase().includes('coimbatore');

  const hasOfflineEvent = tickets?.some(
    (ticket) => ticket.event_mode === 'OFFLINE',
  );

  const showQRCode = !isAmritaCoimbatore && hasOfflineEvent;

  //VALIDATE & SUBMIT FORM
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();

    const hasErrors = Object.keys(errors).some((key) =>
      formFields
        .map((f) => f.field)
        .includes(key as (typeof formFields)[number]['field']),
    );

    if (hasErrors) return setIsEditMode(true);

    setIsEditDisabled(true);
    setTimeout(() => setIsEditDisabled(false), 3000);
  };

  const handleCancel = () => {
    reset({ name, phone_number, college_name, college_city });
    setIsEditMode(false);
  };

  const avatarUrl = `https://www.gravatar.com/avatar/${avatarEmail}.jpg?s=200&d=robohash`;
  const baseAvatarClasses =
    'w-full h-full rounded-full shadow-lg border-2 border-orange-400/30';
  const overlayDiv = (
    <div className="absolute inset-0 rounded-full bg-gradient-to-t from-orange-500/20 to-transparent pointer-events-none"></div>
  );

  const renderInput = (fieldName: (typeof formFields)[number]['field']) => {
    const fieldObj = formFields.find((f) => f.field === fieldName);
    if (!fieldObj) return null;
    const { label, field, placeholder } = fieldObj;
    const error = errors?.[field];

    const inputClassName = error
      ? 'border-red-500 focus-visible:ring-red-500 bg-anokha-dark-400/50 border-anokha-blue/30'
      : isEditMode
        ? 'bg-anokha-dark-400/50 border-anokha-blue/30 text-foreground placeholder:text-gray-400 hover:border-orange-400/50 focus:border-orange-400 focus:ring-orange-400/20 transition-all duration-300'
        : 'bg-anokha-dark-400/30 border-anokha-blue/20 text-foreground opacity-90 cursor-not-allowed';

    return (
      <div key={field + '-group'} className="space-y-2 w-full">
        <label className="text-foreground text-sm font-medium block">
          {label}
        </label>
        <Input
          type="text"
          placeholder={placeholder}
          {...register(field)}
          disabled={!isEditMode}
          className={inputClassName}
          required
        />
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    );
  };

  return (
    <div className="w-full mx-auto max-w-5xl">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-col md:flex-row md:justify-between md:items-start mb-6">
        <div className="mb-4 md:mb-0">
          <h2 className="text-3xl font-bold text-foreground mb-1">Profile</h2>
          <p className="text-muted-foreground text-sm">
            {isEditMode
              ? 'Edit your account details'
              : 'View your account details'}
          </p>
        </div>

        {/* AVATAR DISPLAY FOR SM (MOBILE) - Only if NOT showing QR (original layout) or if handled specially */}
        {/* If showing QR, we want custom placement, so hide this one */}
        {!showQRCode && (
          <div className="relative flex-shrink-0 hidden md:block lg:hidden w-32 h-32">
            <Avatar
              shape="circle"
              image={avatarUrl}
              className={baseAvatarClasses}
            />
            {overlayDiv}
          </div>
        )}
      </div>

      <div className="relative">
        <div className="flex flex-col md:flex-row gap-4 lg:gap-8">
          {/* LEFT COLUMN: FORM */}
          <div className="flex-1 w-full order-2 md:order-1">
            {/* Mobile Avatar (Original Layout) */}
            {!showQRCode && (
              <div className="flex justify-center mb-6 md:hidden">
                <div className="relative w-32 h-32">
                  <Avatar
                    shape="circle"
                    image={avatarUrl}
                    className={baseAvatarClasses}
                  />
                  {overlayDiv}
                </div>
              </div>
            )}

            {/* Mobile Avatar (QR Layout) - Centered at top as requested/implied for Profile */}
            {showQRCode && (
              <div className="flex justify-center mb-6 md:hidden">
                <div className="relative w-32 h-32">
                  <Avatar
                    shape="circle"
                    image={avatarUrl}
                    className={baseAvatarClasses}
                  />
                  {overlayDiv}
                </div>
              </div>
            )}

            {/* FORM FIELDS */}
            {showQRCode ? (
              /* Single Column Layout for QR users */
              <div className="space-y-5">
                {renderInput('name')}
                <div className="space-y-2 w-full" key="email-field">
                  <label className="text-foreground text-sm font-medium block">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={email}
                    disabled
                    className="bg-anokha-dark-400/30 border-anokha-blue/20 text-muted-foreground opacity-70 cursor-not-allowed"
                  />
                </div>
                {renderInput('phone_number')}
                {renderInput('college_name')}
                {renderInput('college_city')}
              </div>
            ) : (
              /* Two Column Layout for Regular users */
              <div className="space-y-5 md:mb-2">
                <div className="lg:mr-48">{renderInput('name')}</div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2 w-full" key="email-field">
                    <label className="text-foreground text-sm font-medium block">
                      Email
                    </label>
                    <Input
                      type="email"
                      value={email}
                      disabled
                      className="bg-anokha-dark-400/30 border-anokha-blue/20 text-muted-foreground opacity-70 cursor-not-allowed"
                    />
                  </div>
                  {renderInput('phone_number')}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {renderInput('college_name')}
                  {renderInput('college_city')}
                </div>
              </div>
            )}

            {/* ACTION BUTTONS */}
            <div className="flex flex-row gap-3 w-full justify-center items-center my-6 md:justify-start">
              <Button
                type="button"
                onClick={handleEditClick}
                disabled={isEditDisabled}
                className={`px-6 py-3 font-semibold uppercase tracking-wide transition-all duration-300 hover:scale-105 sm:min-w-[100px] md:min-w-[160px] ${isEditMode ? 'hidden' : ''} disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
              >
                Edit Profile
              </Button>
              <Button
                type="submit"
                onClick={handleSubmit}
                className={`px-6 py-3 font-semibold uppercase tracking-wide transition-all duration-300 hover:scale-105 sm:min-w-[100px] md:min-w-[160px] ${!isEditMode ? 'hidden' : ''}`}
                disabled={!isDirty}
              >
                Save
              </Button>
              <Button
                type="button"
                onClick={handleCancel}
                variant="outline"
                className={`px-6 py-3 font-semibold uppercase tracking-wide transition-all duration-300 hover:scale-105 sm:min-w-[100px] md:min-w-[160px] border-red-400/50 text-red-400 hover:bg-red-400/10 ${!isEditMode ? 'hidden' : ''}`}
              >
                Cancel
              </Button>
            </div>
          </div>

          {/* RIGHT COLUMN: VISUALS (Avatar + QR) */}
          <div className="flex flex-col items-center gap-20 md:min-w-[250px] order-1 md:order-2 md:-mt-24">
            {/* Desktop Avatar */}
            {!showQRCode ? (
              <div className="hidden lg:block absolute right-0 -top-24 w-40 h-40 z-10">
                <Avatar
                  shape="circle"
                  image={avatarUrl}
                  className={baseAvatarClasses}
                />
                {overlayDiv}
              </div>
            ) : (
              /* QR Layout Avatar - Negative margin to align with header */
              <div className="hidden md:block relative w-40 h-40">
                <Avatar
                  shape="circle"
                  image={avatarUrl}
                  className={baseAvatarClasses}
                />
                {overlayDiv}
              </div>
            )}

            {/* Desktop QR Code */}
            {showQRCode && (
              <div className="hidden md:flex flex-col items-center space-y-3">
                <div className="bg-white p-3 rounded-xl shadow-lg">
                  <QRCode value={userId || ''} size={160} />
                </div>
                <p className="text-center text-foreground font-semibold text-xs opacity-80">
                  Use this QR to enter or exit campus
                </p>
              </div>
            )}
          </div>
        </div>

        {/* MOBILE QR CODE SECTION (Below form & Buttons) */}
        {showQRCode && (
          <div className="md:hidden w-full mt-4">
            <hr className="border-border/40 my-6" />
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-white p-4 rounded-xl">
                <QRCode value={userId || ''} size={200} />
              </div>
              <p className="text-center text-foreground font-semibold">
                Use this QR to enter or exit campus
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
