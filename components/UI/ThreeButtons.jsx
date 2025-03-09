import { ActivityIndicator, Image, Text, TouchableOpacity } from "react-native";

const ThreeButtons = ({
    title,
    handlePress,
    containerStyles,
    textStyles,
    isLoading,
    icon,
    iconStyles,
    disabled,
    ActivityIndicatorColor,
    alternative = false,
}) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            className={`${
                alternative ? "border border-primary" : "bg-[#227099]"
            } rounded-lg h-[120px] w-[115px] p-1 justify-center items-center ${
                isLoading ? "opacity-50" : ""
            }`}
            style={[containerStyles]}
            disabled={isLoading || disabled}>
            <Text
                className={`${
                    alternative ? "text-primary" : "text-[#fafafa] text-center"
                } text-sm font-tmedium ${textStyles}`}>
                {title}
            </Text>
            {icon ? (
                <Image
                    source={icon}
                    className={`h-6 w-6 mt-2 ${iconStyles}`}
                />
            ) : null}

            {isLoading && (
                <ActivityIndicator
                    animating={isLoading}
                    color={
                        ActivityIndicatorColor
                            ? ActivityIndicatorColor
                            : alternative
                            ? "#227099"
                            : "#fff"
                    }
                    size="small"
                    className="mt-2"
                />
            )}
        </TouchableOpacity>
    );
};

export default ThreeButtons;
