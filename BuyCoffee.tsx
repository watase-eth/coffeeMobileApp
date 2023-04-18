import { Web3Button, useAddress, useContract, useContractRead } from "@thirdweb-dev/react-native";
import { ethers } from "ethers";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        borderRadius: 4,
    },
    card: {
        borderWidth: 1,
        borderRadius: 6,
        padding: 20,
        marginTop: 20,
        width: '80%',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    inputTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10
    }
  });

const BuyCoffee = () => {
    const address = useAddress();
    const contractAddress= "0x7e9128EFDE9B66Ed600238cE8Fa640A1D449bfD7";

    const {contract} = useContract(contractAddress);

    const { data: totalCoffees, isLoading: loadingTotalCoffee } = useContractRead(contract, "getTotalCoffee");

    const [message, onChangeMessage] = React.useState('');
    const [name, onChangeName] = React.useState('');

    function clearValues() {
        onChangeMessage("");
        onChangeName("");
    }

    return (
        <View style={styles.card}>
            <Text style={styles.heading}>Buy Coffee</Text>
            {loadingTotalCoffee ? (
                <Text>Loading...</Text>
            ) : (
                <Text>Total Coffee: {totalCoffees?.toString()}</Text>
            )}
            <Text style={styles.inputTitle}>Name:</Text>
            <TextInput 
                style={styles.input}
                placeholder="Name" 
                value={name}
                onChangeText={onChangeName}
            />
            <Text style={styles.inputTitle}>Message:</Text>
            <TextInput
                style={styles.input}
                placeholder="Message" 
                value={message}
                onChangeText={onChangeMessage}
            />
            {address ? (
                <Web3Button
                contractAddress={contractAddress}
                action={(contract) => {
                    contract.call("buyCoffee", message, name, {
                        value: ethers.utils.parseEther("0.01")
                    })
                }}
                onSuccess={() => clearValues()}
                >{"Buy 0.01ETH"}</Web3Button>
            ) : (
                <Text>Please Connect Wallet</Text>
            )}
        </View>
    )
};
export default BuyCoffee;