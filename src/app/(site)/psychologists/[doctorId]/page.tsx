import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Briefcase, Link as LinkIcon, User } from "lucide-react";
import Header from "@/components/layout/Header";
import { CiLinkedin } from "react-icons/ci";
import { CgInstagram } from "react-icons/cg";
import Script from "next/script";
import { Metadata } from "next";

interface DoctorProfileProps {
  params: {
    doctorId: string;
  };
}

export async function generateMetadata({
  params,
}: DoctorProfileProps): Promise<Metadata> {
  const { doctorId } = await params;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/v1/doctors/${doctorId}`,
      { next: { revalidate: 10 } }
    );

    if (!response.ok) throw new Error("Doctor not found");
    const doctorData = await response.json();
    const doctor = doctorData?.data;

    return {
      title: `${doctor?.name ?? "مشاور"} - کلینیک ابراز`,
      description:
        doctor?.resume?.bio ??
        `صفحه معرفی و رزومه ${doctor?.name ?? "مشاور"} در کلینیک ابراز.`,
      openGraph: {
        title: `${doctor?.name ?? "مشاور"} - کلینیک ابراز`,
        description: doctor?.resume?.bio ?? "",
        images: [doctor?.avatar],
      },
    };
  } catch {
    return {
      title: "مشاور یافت نشد | کلینیک ابراز",
      description: "این صفحه در حال حاضر در دسترس نیست.",
    };
  }
}

const DoctorProfile = async ({ params }: DoctorProfileProps) => {
  const { doctorId } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/v1/doctors/${doctorId}`,
    { next: { revalidate: 10 } }
  );

  if (!response.ok) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-gray-500">
        اطلاعات پزشک یافت نشد.
      </div>
    );
  }

  const data = await response.json();
  const doctor = data.data;
  const resume = doctor?.resume ?? {};

  const skills = resume?.skills ?? [];
  const educations = resume?.educations ?? [];
  const experiences = resume?.experiences ?? [];
  const social = resume?.social_links ?? {};

  return (
    <div className="bg-niceblue-50 min-h-screen">
      {/* Header */}
      <Header
        pageTitle={doctor.name}
        bread="مشاورین"
        breadLink="/psychologists"
      />

      {/* Structured Data for SEO */}
      <Script
        id="doctor-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: doctor.name,
            jobTitle: resume?.specialization,
            description: resume?.bio,
            image: doctor.avatar,
            url: `https://ebrazclinic.ir/psychologists/${doctor.id}`,
            sameAs: Object.values(social ?? {}),
          }),
        }}
      />

      {/* Main Content */}
      <div className="w-full px-4 md:px-12 lg:px-32 py-10 space-y-4">
        {/* Doctor Info */}
        <div className="flex flex-col lg:flex-row items-start gap-4">
          <div className="w-full lg:w-1/3 flex justify-center">
            <Image
              src={doctor.avatar || "/default-avatar.jpg"}
              alt={doctor.name}
              width={400}
              height={400}
              className="rounded-md shadow-md object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>

          <div className="w-full lg:w-2/3 space-y-4">
            <div className="bg-white/30 border border-niceblue-200 rounded-md shadow p-6 space-y-3">
              <h2 className="text-xl">عنوان</h2>
              <p className="text-xl font-semibold mb-2 text-niceblue-primary">
                {resume?.title ?? "—"}
              </p>
            </div>

            <div className="min-h-64 bg-white/30 border border-niceblue-200 rounded-md shadow p-4">
              <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                معرفی
              </h2>
              <p className="text-justify leading-relaxed text-niceblue-primary">
                {resume?.bio ?? "اطلاعاتی ثبت نشده است."}
              </p>
            </div>
          </div>
        </div>

        {/* Specialization & Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/30 border border-niceblue-200 rounded-md shadow p-6">
            <h2 className="text-xl font-semibold mb-2">تخصص اصلی</h2>
            <p className="text-niceblue-primary">
              {resume?.specialization ?? "—"}
            </p>
          </div>

          <div className="bg-white/30 border border-niceblue-200 rounded-md shadow p-6">
            <h2 className="text-xl font-semibold mb-3">مهارت‌ها</h2>
            <div className="flex flex-wrap gap-2">
              {skills?.length > 0 ? (
                skills.map((skill: string, i: number) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="px-3 py-1 bg-niceblue-primary text-white/30"
                  >
                    {skill}
                  </Badge>
                ))
              ) : (
                <p className="text-gray-500">مهارتی ثبت نشده است.</p>
              )}
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="bg-white/30 border border-niceblue-200 rounded-md shadow p-6">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <GraduationCap className="w-5 h-5" />
            تحصیلات
          </h2>
          {educations?.length > 0 ? (
            <ul className="list-disc pr-5 space-y-2 text-niceblue-primary">
              {educations.map((edu: any, i: number) => (
                <li key={i}>
                  {edu.degree} - {edu.institution} ({edu.year})
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">تحصیلات ثبت نشده است.</p>
          )}
        </div>

        {/* Experience */}
        <div className="bg-white/30 border border-niceblue-200 rounded-md shadow p-6">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-primary" />
            سوابق کاری
          </h2>
          {experiences?.length > 0 ? (
            <ul className="list-disc pr-5 space-y-2 text-niceblue-primary">
              {experiences.map((exp: any, i: number) => (
                <li key={i}>
                  {exp.role} در {exp.organization} از {exp.from} تا {exp.to}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">سابقه کاری ثبت نشده است.</p>
          )}
        </div>

        {/* Social Links */}
        <div className="bg-white/30 border border-niceblue-200 rounded-md shadow p-6">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <LinkIcon className="w-5 h-5 text-primary" />
            شبکه‌های اجتماعی
          </h2>
          <div className="flex gap-4 flex-wrap items-center">
            {social?.linkedin && (
              <a
                href={social.linkedin}
                target="_blank"
                className="text-blue-600 hover:scale-110 transition-transform"
              >
                <CiLinkedin size={48} />
              </a>
            )}
            {social?.instagram && (
              <a
                href={social.instagram}
                target="_blank"
                className="text-pink-500 hover:scale-110 transition-transform"
              >
                <CgInstagram size={42} />
              </a>
            )}
            {social?.website && (
              <a
                href={social.website}
                target="_blank"
                className="text-green-600 hover:underline"
              >
                وب‌سایت شخصی
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
