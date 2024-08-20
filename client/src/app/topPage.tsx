import Image from 'next/image';
type Data = {
    id: number,
    title: string,
    content: string,
    icon: any
}
export default function TopPageComponent({data}:{data: Data}) {
    return(
        <div className="flex text-[#757575] px-4 py-6 bg-white">
            <Image className='mr-4' src={data.icon} alt="" />
            <div>
                <h3 className="text-[16px] font-semibold mb-1">{data.title}</h3>
                <p>{data.content}</p>
            </div>
        </div>
    )
}