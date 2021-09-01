export default function Help_and_Support(props) {
  const { details: { html, msg }, closeModal } = props;
  
  console.log(props)
  
  return (
    <div className='flex items-center justify-center z-50 h-screen w-screen bg-opacity-50 fixed bg-gray-700'>
      <div className='bg-white rounded-lg relative' style={{ height: '80vh', width: '100vh' }}>
        <div onClick={closeModal} className='cursor-pointer border-2 border-gray-700 absolute right-2 top-2 rounded-full px-2 text-gray-700 hover:bg-gray-700 hover:text-white duration-100'>X</div>
        <div className='border-b-2 p-2 border-gray-400 text-center font-bold text-lg'>{msg}</div>
        <div className='py-2 pr-4 h-full'>
          <iframe style={{ width: '100%', minHeight: '92%' }} srcDoc={html} />
        </div>
      </div>
    </div>
  )
}