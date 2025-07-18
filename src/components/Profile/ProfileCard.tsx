import { UseFormRegister } from 'react-hook-form';
import QRCode from 'react-qr-code';
import { Input } from '@/components/ui/input';
import { EditableFields } from '@/types/profileTypes';
import { Button } from '../ui/button';

type Props = {
  avatarEmail: string;
  email: string;
  name: string;
  phone: string;
  collegeName: string;
  collegeCity: string;
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
  phone,
  collegeName,
  collegeCity,
  register,
  errors,
  onSubmit,
}: Props) {
  const qrValue = JSON.stringify({
    name,
    phone,
    collegeName,
    collegeCity,
    email,
  });

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl px-12 py-10">
        <h1 className="text-xl font-bold text-white text-center">Profile</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div className="mt-6 w-full flex flex-col md:flex-row md:gap-10 justify-center">
            {/* LEFT FORM SIDE */}
            <div className="flex text-white flex-col space-y-6 md:border-r md:border-gray-300/30 md:pr-10 flex-1">
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
                  <div key={field} className="space-y-1">
                    <label className="text-white text-sm font-medium">
                      {label}
                    </label>
                    <Input
                      type="text"
                      placeholder={placeholder}
                      {...register(field)}
                      className={
                        error ? 'border-red-500 focus-visible:ring-red-500' : ''
                      }
                      required
                    />
                    {error && <p className="text-xs text-red-400">{error}</p>}
                  </div>
                );
              })}
              <div className="space-y-1">
                <label className="text-white text-sm font-medium">Email</label>
                <Input
                  type="email"
                  value={email}
                  disabled
                  className="opacity-70"
                />
              </div>
            </div>

            {/* RIGHT QR & BUTTON */}
            <div className="flex flex-col items-center justify-start mt-8 xl:mt-12 md:mt-0 gap-6">
              <div className="bg-white p-4 rounded-xl shadow-md">
                <QRCode value={qrValue} size={150} />
              </div>
              <Button type="submit" className="xl:mt-12 w-[200px]">
                Save / Update
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
