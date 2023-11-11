import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

// Define the navigation parameters
export type RootStackParamList = {
    TextViewerScreen: {
        label: string;
        textContent: string;
        deleteButton? : boolean;
        deleteBtnClick?: () => void;
      },
    ZoomableImages:{
        dataList: string[],
        currentIndex: number
    }
};