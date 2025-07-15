import { toast } from 'react-hot-toast';
import QRCode from 'react-qr-code';
import { Input } from '@/components/ui/input';
import { EditableFields } from '@/types/profileTypes';
import { Button } from '../ui/button';

type Props = {
  avatarEmail: string;
  name: string;
  phone: string;
  collegeName: string;
  collegeCity: string;
  email: string;
  errors: {
    name?: string;
    phone?: string;
    collegeName?: string;
    collegeCity?: string;
  };
  onChange: (field: EditableFields, value: string) => void;
  onSubmit: () => void;
};

export function ProfileCard({
  avatarEmail,
  name,
  phone,
  collegeName,
  collegeCity,
  email,
  errors,
  onChange,
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
            <div className="flex flex-col space-y-6 md:border-r md:border-gray-300/30 md:pr-10 flex-1">
              {[
                {
                  label: 'Name',
                  value: name,
                  field: 'name',
                  placeholder: 'Enter Name',
                },
                {
                  label: 'Phone Number',
                  value: phone,
                  field: 'phone',
                  placeholder: '+91 99999 99999',
                },
                {
                  label: 'College Name',
                  value: collegeName,
                  field: 'collegeName',
                  placeholder: 'Enter College Name',
                },
                {
                  label: 'College City',
                  value: collegeCity,
                  field: 'collegeCity',
                  placeholder: 'Enter College City',
                },
              ].map(({ label, value, field, placeholder }) => {
                const error = errors?.[field as keyof typeof errors];
                return (
                  <div key={field} className="space-y-1">
                    <label className="text-white text-sm font-medium">
                      {label}
                    </label>
                    <Input
                      type="text"
                      placeholder={placeholder}
                      value={value}
                      onChange={(e) =>
                        onChange(field as EditableFields, e.target.value)
                      }
                      className={
                        error ? 'border-red-500 focus-visible:ring-red-500' : ''
                      }
                      required
                    />
                    {error && toast.error(error)}
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
