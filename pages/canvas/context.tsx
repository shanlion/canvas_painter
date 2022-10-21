import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useMemo
} from 'react';
import {SubscriptionCallback, useCreateSubscription} from './utls/use-create-subscription';
type CanvasConfigType = {
  strokeStyle: string; // 笔刷颜色
  lineWidth: number; // 笔刷大小
  drawType: string; // 笔刷形状 默认 normal 蜡笔 crayon
  flowType: string; // 流程图图形
}
interface CanvasContextProps {
  dimensionLimit?: number;
}
interface CanvasContextValue {
  contextProps: CanvasContextProps;
  id?: number;
  config: CanvasConfigType;
  pathData: any[];
  subscribeConfigChange: (
    cb: SubscriptionCallback<CanvasConfigType>,
    key?: keyof CanvasConfigType,
  ) => void;
}
const defaultConfig = {
  strokeStyle: 'green',
  lineWidth: 32,
  drawType: 'crayon',
  flowType: ''
}
export function CanvasProvider(
  props: React.PropsWithChildren<CanvasContextProps>,
) {
  const { children, ...contextProps} = props;
  const { config, subscribe } = useInternalCanvasConfig();
  const value = {
    contextProps,
    config,
    pathData: [],
    subscribeConfigChange: subscribe
  }
  return (
    <CanvasContext.Provider value={value}>
      {children}
    </CanvasContext.Provider>
  );
}

export function useInternalCanvasConfig() {
  const target = useMemo<CanvasConfigType>(
    () => ({
      ...defaultConfig
    }),
    [],
  );
  const { proxied, subscribe } = useCreateSubscription(target);
  return { config: proxied, subscribe };
}


export const CanvasContext = createContext<CanvasContextValue>({
  contextProps: {},
  config: defaultConfig,
  pathData: [],
  subscribeConfigChange: () => null
});

export function useCanvasContext() {
  return useContext(CanvasContext);
}

export function useCanvasConfig(key?: keyof CanvasConfigType) {
  const context = useContext(CanvasContext);
  const [, update] = useReducer(() => ({}), {});
  useEffect(() => context.subscribeConfigChange(update, key), [key, context]);
  return context;
}