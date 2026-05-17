import { Mail, Phone, Calendar, MapPin } from "lucide-react";
import { profileData } from "@/lib/portfolio-data";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

interface ProfileSidebarProps {
  data?: typeof profileData;
}

export function ProfileSidebar({ data = profileData }: ProfileSidebarProps) {
  return (
    <aside className='w-full lg:w-80 bg-card rounded-2xl border border-border p-4 md:p-6 lg:sticky lg:top-8 h-fit'>
      {/* Profile Image */}
      <div className='flex flex-col items-center'>
        <div className='relative w-24 h-24 md:w-32 md:h-32 mb-4 md:mb-6'>
          <div className='absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/20 via-accent/5 to-transparent animate-pulse-slow' />
          <div className='absolute inset-[2px] rounded-3xl bg-secondary overflow-hidden'>
            <img src={data.avatar || "/placeholder.svg"} alt={data.name} className='w-full h-full object-cover' />
          </div>
        </div>

        <h1 className='text-xl md:text-2xl font-bold text-foreground mb-1'>{data.name}</h1>
        <p className='text-xs md:text-sm text-muted-foreground bg-secondary px-3 md:px-4 py-1 rounded-lg'>{data.title}</p>
      </div>

      {/* Divider */}
      <div className='h-px bg-border my-4 md:my-6' />

      {/* Contact Info */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 md:gap-4'>
        <div className='flex items-start gap-3'>
          <div className='w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0'>
            <Mail className='w-5 h-5 text-accent' />
          </div>
          <div className='flex-1 min-w-0'>
            <p className='text-xs text-muted-foreground uppercase mb-1'>邮箱</p>
            <a href={`mailto:${data.email}`} className='text-sm text-foreground hover:text-accent transition-colors break-all'>
              {data.email}
            </a>
          </div>
        </div>

        <div className='flex items-start gap-3'>
          <div className='w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0'>
            <Phone className='w-5 h-5 text-accent' />
          </div>
          <div className='flex-1'>
            <p className='text-xs text-muted-foreground uppercase mb-1'>电话</p>
            <a href={`tel:${data.phone.replace(/\s/g, "")}`} className='text-sm text-foreground hover:text-accent transition-colors'>
              {data.phone}
            </a>
          </div>
        </div>

        <div className='flex items-start gap-3'>
          <div className='w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0'>
            <Calendar className='w-5 h-5 text-accent' />
          </div>
          <div className='flex-1'>
            <p className='text-xs text-muted-foreground uppercase mb-1'>生日</p>
            <p className='text-sm text-foreground'>{data.birthday}</p>
          </div>
        </div>

        <div className='flex items-start gap-3'>
          <div className='w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0'>
            <MapPin className='w-5 h-5 text-accent' />
          </div>
          <div className='flex-1'>
            <p className='text-xs text-muted-foreground uppercase mb-1'>城市</p>
            <p className='text-sm text-foreground'>{data.location}</p>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className='flex items-center justify-center gap-4 mt-4 md:mt-6 pt-4 md:pt-6 border-t border-border'>
        <a
          href={data.social.github}
          target='_blank'
          rel='noopener noreferrer'
          className='w-10 h-10 rounded-lg bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors flex items-center justify-center'
          aria-label='GitHub'
        >
          <GitHubIcon className='w-5 h-5' />
        </a>
      </div>
    </aside>
  );
}
