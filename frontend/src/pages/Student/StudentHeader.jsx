
export const StudentHeader = () => {

    return <>
        <header class="flex items-center justify-between px-5 py-3 w-full bg-blue-2 text-blue-900 font-bold">
        {/* Logo */}
        <div class="flex items-center gap-3.5 px-4 py-2 text-xs text-blue-900 bg-white rounded-2xl max-md:px-5">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/0d6e3d0b82f1251f02c2f317eafb29fe09f47dbe5a226aa1dbeac5d7b6efbf04?placeholderIfAbsent=true&apiKey=aa0c3b8d094f45b48d52977318229ea8"
            alt="University logo"
            class="object-contain shrink-0 aspect-[0.94] w-[35px]"
          />
        </div>
  
      </header>
    
    </>
}