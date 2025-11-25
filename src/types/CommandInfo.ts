export default interface CommandInfo {
  usageExample: string;
  description: string;
  allowedDefault?: boolean;
  permissionsRequired?: bigint[];
  dmableCommand?: boolean;
}
