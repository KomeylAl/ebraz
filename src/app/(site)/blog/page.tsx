import Header from "@/components/layout/Header";

const Departments = () => {
  return (
    <div>
      <Header pageTitle="وبلاگ" />
      <div className="w-full px-5 md:px-24 lg:px-48 py-12 space-y-6 flex flex-col items-center">
        <h2 className="text-3xl font-semibold">
          وبلاگ مرکز ابراز
        </h2>
        <p>آخرین مطالب مجله ابراز را از این قسمت مشاهده کنید</p>
        <div className="w-full flex flex-wrap items-center justify-center gap-6"></div>
      </div>
    </div>
  );
};

export default Departments;
