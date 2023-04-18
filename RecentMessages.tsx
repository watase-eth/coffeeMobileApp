import { useContract, useContractRead } from "@thirdweb-dev/react-native/dist/evm";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
    messageCard: {
        padding: 10,
        borderWidth: 1,
        marginBottom: 10,
        borderRadius: 4,
        backgroundColor: '#fff',
    },
    messageContainer: {
        borderWidth: 1,
        borderRadius: 6,
        padding: 20,
        marginTop: 10,
        width: '80%',
    },
    message: {
        fontSize: 14,
    },
    messageSender: {
        fontSize: 12,
        color: 'grey',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
    },
    container: {
        width: '100%',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

const RecentMessages = () => {
    const contractAddress = "0x7e9128EFDE9B66Ed600238cE8Fa640A1D449bfD7";
    const {contract} = useContract(contractAddress);

    const { data: recentCoffee, isLoading: loadingRecentCoffee } = useContractRead(contract, "getAllCoffee");
    
	return (
		<View style={styles.container}>
			<Text style={styles.heading}>Recent Messages:</Text>
            <ScrollView style={styles.messageContainer}>
                {loadingRecentCoffee ? (
                    <Text>Loading...</Text>
                ) : (
                    <View>
                        {recentCoffee?.map((coffee: { message: string; name: string; }, index: React.Key | null | undefined) => {
                            return (
                                <View key={index} style={styles.messageCard}>
                                    <Text style={styles.message}>{coffee.message}</Text>
                                    <Text style={styles.messageSender}>From: {coffee.name}</Text>
                                </View>
                            );
                        }).reverse()
                        }
                    </View>
                )}
            </ScrollView>
		</View>
	)
};
export default RecentMessages;