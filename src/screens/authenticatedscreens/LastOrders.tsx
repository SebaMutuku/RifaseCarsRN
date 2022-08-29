import {Text, View} from "../../components/Themed";
import {SafeAreaProvider} from "react-native-safe-area-context";
import layoutParams from "../../utils/LayoutParams";

export default function LastOrders() {
    return (<SafeAreaProvider style={{
        flex: 1, backgroundColor: layoutParams.colors.backgroundColor
    }}>
        <View>
            <Text>
                {LastOrders.name}
            </Text>
        </View>
    </SafeAreaProvider>);
}
