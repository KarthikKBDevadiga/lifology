import Link from 'next/link'
import styles from '/styles/Item.module.css'

const MagazineItem = ({ magazine }) => {
    return (
        <Link href={'/career_explorer/magazine/' + magazine.id} key={magazine.id}>
            <a>
                <div className="group relative shadow mx-2 my-4 rounded m-1 hover:shadow-xl hover:scale-105 duration-500">
                    <div>
                        <img className="rounded-t group-hover:filter-none duration-500 w-full h-32 object-cover" src={magazine.thumbnail} />
                        {/* <img className=" rounded-t " src={card.thumbnail} /> */}
                        <div className="flex-1 flex items-center justify-between ">
                            <div className="flex-1 px-3 pb-2 text-sm  ">
                                <div className={styles.heading}>
                                    {magazine.title}
                                </div>
                                <div className={styles.subheading}>{magazine.description}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </Link >
    )
}
export default MagazineItem