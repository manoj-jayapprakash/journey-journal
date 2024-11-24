import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { GoogleAuthButton } from "@/features/auth/components/google-auth-button";
export default async function Login() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <Card className='w-full max-w-md'>
        <CardHeader className='text-center'>
          <CardTitle className='text-2xl font-bold text-gray-900'>
            Welcome to TravelLog
          </CardTitle>
          <CardDescription className='text-gray-500'>
            Share your adventures with fellow travelers
          </CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col items-center gap-4'>
          <GoogleAuthButton />
        </CardContent>
      </Card>
    </div>
  );
}
