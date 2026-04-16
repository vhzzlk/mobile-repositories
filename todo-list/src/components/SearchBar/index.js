import { View,TextInput} from "react-native";
import React from "react";
import style from "./style.js";

export default function SearchBar({ value, onChangeText }) {
    return (
        <View >
            <TextInput style={style.input}
                placeholder="Pesquisar por titulo..."
                value={value}
                onChangeText={onChange}

            />
            </View>
    )
}