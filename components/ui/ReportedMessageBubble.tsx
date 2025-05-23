import { useReportMessage } from '@/contexts/ReportMessageContext'
import createStyles from '@/stylesheets/createStyles'
import { ReportMessage } from '@/utils/firebase/firestore'
import { generateDate } from '@/utils/generators'
import React from 'react'
import { Image, Text, View } from 'react-native'

type ReportedMessageProps = {
    reportMessage : ReportMessage | null
}

export default function ReportedMessageBubble( {reportMessage} : ReportedMessageProps) {
    const styles = createStyles()
  return (
                <View style={[{width: "100%", alignSelf: "center", padding: 4, margin: 2}]}>
                    <Text style ={[styles.textDefault, {fontSize: 12, marginVertical: 2, marginLeft: 10}]}>{generateDate(reportMessage?.message?.month, reportMessage?.message?.day, reportMessage?.message?.year)}</Text>
                    <View style={[{ backgroundColor: "rgba(56, 57, 76, 0.5)", padding: 8, borderRadius: 12, borderColor: "rgb(240, 240, 240)", borderWidth: 1}]}>
                    <View style={[{width: "100%",flexDirection: "row", justifyContent: "space-between", alignItems: "center"}]}>
                        <View style={[{flexDirection: "row"}]}>
                        <Image style={[{width: 42, height: 42, borderRadius: "100%", marginRight: 8}]} source={reportMessage?.message?.photoUrl ?{uri: reportMessage?.message?.photoUrl} : require('@/assets/images/blank-pfp.png')}></Image>
                            <View>
                                <Text style={[styles.textDefault]}>{reportMessage?.message?.displayName}</Text>
                                <Text style={[styles.textDefault, {fontSize: 12, color: "rgb(220, 220, 220)"}]}>{`${reportMessage?.message?.hour}:${reportMessage?.message?.minute.toString().padStart(2, '0')} ${reportMessage?.message?.meridiem}`}</Text>
                            </View>
                        </View>
                    </View>
                    {reportMessage?.message?.message && <Text style={[styles.textDefault, {padding: 4, marginTop: 4}]}>{reportMessage.message.message}</Text>}
                    </View>
                </View>
  )
}
