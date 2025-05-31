import BackButton from "./back-button";
import Title from "./title-component";
import { useNavigation, type NavigationProp } from "@react-navigation/native";
import type { NavigationStackParamList } from "../config/navigation-stack-param";

type PageHeaderProps = {
  pageTitle: string;
};

export default function PageHeader({ pageTitle }: PageHeaderProps) {
  const navigation = useNavigation<NavigationProp<NavigationStackParamList>>();

  const _goBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <BackButton callback={_goBack} />
      <Title title={pageTitle} />
    </>
  );
}