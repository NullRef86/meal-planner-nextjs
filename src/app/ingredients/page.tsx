import { Suspense } from "react";
import { getIngredients } from "./actions";
import { ListItem } from "./_components/client-components/ListItem";
import Header from "../_components/Header";
import Main from "../_components/Main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import LoadingPanel from "../_components/LoadingPanel";
import Link from "../_components/Link";
import { Ingredient } from "@prisma/client";
import { groupBy } from "@/utils";

export const dynamic = 'force-dynamic';

interface IProps {
    searchParams?: {
        groupBy?: 'category' | 'none';
    };
}

export default async function Home({ searchParams }: IProps) {

    const List = async () => {
        const ingredients = await getIngredients();

        const ListItems = ({ ingredients }: { ingredients: Ingredient[] }) => (
            <ul className="flex flex-col gap-2">
                {
                    ingredients
                        .reverse()
                        .map((ingredient) => (
                            <ListItem key={ingredient.id} ingredient={ingredient} />
                        ))
                }
            </ul>
        );

        switch (searchParams?.groupBy) {
            case 'none':
                return <ListItems ingredients={ingredients} />;
            case 'category':
            default:
                const groupedIngredients = groupBy(ingredients, (ingredient) => ingredient.category);

                return (
                    <div className="flex flex-col gap-2">
                        {
                            groupedIngredients
                                .sort(([a], [b]) => a.localeCompare(b))
                                .map(([category, ingredients]) => (
                                    <div key={category} className="flex flex-col gap-4">
                                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white border-b-slate-500 border-b-2 text-center pb-2">
                                            {category}
                                        </h2>
                                        <ListItems ingredients={ingredients} />
                                    </div>
                                ))
                        }
                    </div>
                );
        }
    }

    return (
        <Main>
            <Header backUrl="/">
                Ingredients
            </Header>

            <div className="flex justify-between mb-4">
                <Link button href={'/ingredients/view'}>
                    Add New Ingredient <FontAwesomeIcon icon={faPlus} />
                </Link>

                {
                    !searchParams?.groupBy || searchParams.groupBy === 'category'
                        ? (
                            <Link button href={'/ingredients?groupBy=none'}>
                                Clear Grouping
                            </Link>
                        )
                        : (
                            <Link button href={'/ingredients?groupBy=category'}>
                                Group By Category
                            </Link>
                        )
                }
            </div>

            <Suspense fallback={<LoadingPanel />}>
                <List />
            </Suspense>
        </Main>
    );
}
