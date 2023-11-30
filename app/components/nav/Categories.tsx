'use client';

import { categories } from "@/utils/Categories";
import Container from "../Container";
import Category from "./Category";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/dist/client/components/navigation";

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');

    const pathname = usePathname();
    const isMainPage = pathname === '/';
    // console.log(pathname, params?.get('category'));
    
    if(!isMainPage){
        return null;
    }
    return ( 
        <div className="bg-white">
            <Container>
                <div className="pt-4 flex items-center justify-between overflow-x-auto">
                    {categories.map((item) =>{
                        return <Category key={item.label}  label={item.label} icon={item.icon} selected={(category && category === item.label) || (category === null && item.label === "All")} />;
                    })}
                </div>
            </Container>
        </div>
     );
}
 
export default Categories;