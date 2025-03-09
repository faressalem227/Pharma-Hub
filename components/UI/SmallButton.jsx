import { ActivityIndicator, Image, Text, TouchableOpacity } from "react-native";

const MainButton = ({
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
                alternative ? " border border-primary " : "bg-[#227099]"
            }  rounded-lg min-h-[100px] p-3 w-[48%] justify-center items-center ${containerStyles} ${
                isLoading ? "opacity-50" : ""
            }`}
            disabled={isLoading || disabled ? true : false}>
            {icon ? (
                <Image
                    source={icon}
                    className={`  ${iconStyles} w-8 h-8`}
                />
            ) : (
                ""
            )}
            <Text
                className={`${
                    alternative ? "text-primary" : "text-[#fafafa]"
                }  text-lg font-tmedium text-center ${textStyles} `}>
                {title}
            </Text>

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
                    className="ml-2"
                />
            )}
        </TouchableOpacity>
    );
};

export default MainButton;
