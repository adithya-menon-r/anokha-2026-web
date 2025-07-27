import { Avatar } from 'primereact/avatar';
import { UseFormRegister } from 'react-hook-form';
import QRCode from 'react-qr-code';
import { Input } from '@/components/ui/input';
import { EditableFields } from '@/types/profileTypes';
import { Button } from '../ui/button';

type Props = {
  avatarEmail: string;
  email: string;
  name: string;
  register: UseFormRegister<Record<EditableFields, string>>;
  errors: {
    name?: string;
    phone?: string;
    collegeName?: string;
    collegeCity?: string;
  };
  onSubmit: () => void;
};

export function ProfileCard({
  avatarEmail,
  email,
  name,
  register,
  errors,
  onSubmit,
}: Props) {
  const qrValue = name;

  return (
    <div className="w-full mx-auto max-w-4xl">
      {/* Header Section - Profile title/subtext on left, Avatar on right */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-1">Profile</h2>
          <p className="text-muted-foreground text-sm">
            Manage your account details
          </p>
        </div>

        <div className="relative ml-4">
          <Avatar
            shape="circle"
            image={`https://www.gravatar.com/avatar/${avatarEmail}.jpg?s=200&d=robohash`}
            className="w-20 h-20 rounded-full shadow-lg border-2 border-orange-400/30"
            size="xlarge"
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-orange-500/20 to-transparent"></div>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div className="flex flex-col lg:flex-row lg:gap-12 justify-start items-center">
          {/* LEFT FORM SIDE */}
          <div className="w-full lg:w-96 flex-1">
            <div className="space-y-5">
              {(
                [
                  {
                    label: 'Name',
                    field: 'name',
                    placeholder: 'Enter Name',
                  },
                  {
                    label: 'Phone Number',
                    field: 'phone',
                    placeholder: '+91 99999 99999',
                  },
                  {
                    label: 'College Name',
                    field: 'collegeName',
                    placeholder: 'Enter College Name',
                  },
                  {
                    label: 'College City',
                    field: 'collegeCity',
                    placeholder: 'Enter College City',
                  },
                ] as const
              ).map(({ label, field, placeholder }) => {
                const error = errors?.[field];
                return (
                  <div key={field} className="space-y-2">
                    <label className="text-foreground text-sm font-medium block">
                      {label}
                    </label>
                    <Input
                      type="text"
                      placeholder={placeholder}
                      {...register(field)}
                      className={
                        error
                          ? 'border-red-500 focus-visible:ring-red-500 bg-anokha-dark-400/50 border-anokha-blue/30'
                          : 'bg-anokha-dark-400/50 border-anokha-blue/30 text-foreground placeholder:text-gray-400 hover:border-orange-400/50 focus:border-orange-400 focus:ring-orange-400/20 transition-all duration-300'
                      }
                      required
                    />
                    {error && <p className="text-xs text-red-400">{error}</p>}
                  </div>
                );
              })}

              {/* Email field - read only */}
              <div className="space-y-2">
                <label className="text-foreground text-sm font-medium block">
                  Email
                </label>
                <Input
                  type="email"
                  value={email}
                  disabled
                  className="bg-anokha-dark-400/30 border-anokha-blue/20 text-muted-foreground opacity-70"
                />
              </div>
            </div>
          </div>

          {/* RIGHT QR & BUTTON SECTION */}
          <div className="flex flex-col items-center justify-center mt-8 lg:mt-0 gap-6 lg:min-h-[400px]">
            {/* QR Code */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <QRCode value={qrValue} size={160} />
            </div>

            {/* Save Button */}
            <Button
              type="submit"
              className="px-6 py-3 font-semibold uppercase tracking-wide transition-all duration-300 hover:scale-105 min-w-[160px]"
            >
              Save / Update
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
