import { ActivityIndicator, Image, Text, TouchableOpacity } from "react-native";

const ButtonWithoutIcons = ({
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
            }  rounded-lg min-h-[62px] flex flex-row justify-center w-[47%] items-center m-1 ${containerStyles} ${
                isLoading ? "opacity-50" : ""
            }`}
            disabled={isLoading || disabled ? true : false}>
            {icon ? (
                <Image
                    source={icon}
                    className={`h-6 w-6 mr-6  ${iconStyles}`}
                />
            ) : (
                ""
            )}
            <Text
                className={`${
                    alternative ? "text-primary" : "text-[#fafafa]"
                }  text-lg font-tmedium  ${textStyles} `}>
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

export default ButtonWithoutIcons;
