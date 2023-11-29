import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import PostModel from '../Model/PostModel';

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
    },
    PostDetails:{
        item:PostModel;
    }
};