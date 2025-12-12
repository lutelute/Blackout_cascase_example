# 電力系統シミュレーション集

電力系統の安定性問題を視覚的に学習できるインタラクティブシミュレーション集です。

## 🚀 クイックスタート

### [**🌐 ライブデモはこちら**](https://lutelute.github.io/Blackout_cascase_example/)

[![シミュレーション画面](https://img.shields.io/badge/Demo-Live%20Simulation-blue?style=for-the-badge&logo=github)](https://lutelute.github.io/Blackout_cascase_example/)

## 📊 シミュレーション一覧

| シミュレーション | 説明 | デモ | 詳細 |
|---|---|---|---|
| 🔥 **カスケード停電** | 連鎖的な電力系統崩壊のシミュレーション | [🚀 実行](https://lutelute.github.io/Blackout_cascase_example/#cascade-demo) | [📖 詳細](https://lutelute.github.io/Blackout_cascase_example/cascade_blackout/) |
| ⚡ **電圧安定度** | 電圧崩壊とVARサポートのシミュレーション | [🚀 実行](https://lutelute.github.io/Blackout_cascase_example/enhanced_voltage/enhanced.html) | [📖 詳細](https://lutelute.github.io/Blackout_cascase_example/enhanced_voltage/) |
| 🔄 **UC Jam安定度** | IEEE30バス系統での安定度解析 | [🚀 実行](https://lutelute.github.io/Blackout_cascase_example/UC_Jam_stability/ieee30_integrated.html) | [📖 詳細](https://lutelute.github.io/Blackout_cascase_example/UC_Jam_stability/) |

## ⚡ 主な機能

- **DC/AC潮流計算** - 高速DC計算と高精度AC計算
- **インタラクティブ操作** - ステップバイステップ実行
- **リアルタイム監視** - 発電機負荷率・電圧表示
- **複数故障シナリオ** - 極限から段階的まで
- **電圧安定性解析** - 電圧崩壊メカニズムの可視化

## 🎯 用途

- 🎓 **教育**: 大学・高専の電力系統工学講義
- 🏢 **研修**: 電力会社の新人・技術者トレーニング
- 🔬 **研究**: 系統安定性の基礎学習

## 🚀 使い方

1. 上記の[**ライブデモ**](https://lutelute.github.io/Blackout_cascase_example/)にアクセス
2. 興味のあるシミュレーションを選択
3. シナリオを選択して「自動」または「次へ」で実行
4. 系統図で電力の流れと故障の波及を観察

### ローカル実行

```bash
git clone https://github.com/lutelute/Blackout_cascase_example.git
# ブラウザでindex.htmlを開く
```

## 📋 システム仕様

- **系統規模**: 30ノード、40線路（3地域構成）
- **発電容量**: 2,070MW（地域A: 750MW、地域B: 460MW、地域C: 640MW、他）
- **計算手法**: DC/AC潮流計算（ニュートン・ラプソン法）
- **技術**: HTML5、JavaScript、React（一部）

## 🔧 開発・貢献

```bash
# プロジェクトをフォーク・クローン
git clone https://github.com/yourusername/Blackout_cascase_example.git

# ファイル構成
├── cascade_blackout/    # カスケード停電シミュレーション
├── enhanced_voltage/    # 電圧安定度シミュレーション  
├── UC_Jam_stability/    # IEEE30バス系統解析
└── index.html          # メインナビゲーション
```

### 貢献方法
- 🐛 バグ報告: [Issues](https://github.com/lutelute/Blackout_cascase_example/issues)
- 💡 機能提案: Pull Request歓迎
- 📖 ドキュメント改善

## 📄 ライセンス・免責

MIT License - 教育・研究目的での使用を想定

⚠️ **免責事項**: このシミュレーションは教育目的のみ。実際の電力系統運用には使用禁止。

---

💡 **電力系統工学の学習に役立ったら⭐をお願いします！**